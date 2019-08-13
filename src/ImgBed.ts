var fly = require('flyio')
import { createReadStream } from 'fs'

export default class ImgBed {
  /**
   * 挨个上传，直到上传成功为止
   * @param imgPath  图片路径（绝对路径）
   * @param beds 图床列表，默认为所有：'sm', 'nt', 'sina1', 'sina2'
   */
  static up(imgPath: string, ...beds: string[]) {
    if (beds.length == 0) {
      beds = ['sm', 'nt', 'sina1', 'sina2']
    }

    return new Promise((res, rej) => {
      let pro: any = Promise.reject()
      for (const bed of beds) {
        pro = pro.catch(_ => ImgBed[bed](imgPath)).then(url => res(url))
      }
      pro.catch(err => rej(err))
    })
  }

  /**
   * 上传图片（SM）
   * sm 限制了短时间内重复图片，同一张图短时间内无法上传第二次
   * https://sm.ms/
   * @param imgPath 图片路径（绝对路径）
   */
  static async sm(imgPath: string) {
    let { code, msg, data } = await ImgBed.upload('https://sm.ms/api/upload', {
      smfile: createReadStream(imgPath)
    })

    if (code == 'exception') throw Error(msg || '上传失败')

    return data.url
  }

  /**
   * 上传图片（牛图）
   * https://www.niupic.com
   * @param imgPath 图片路径（绝对路径）
   */
  static async nt(imgPath: string) {
    let { img_puburl } = await ImgBed.upload('https://www.niupic.com/api/upload', {
      image_field: createReadStream(imgPath)
    })

    if (!img_puburl) throw Error('上传失败')

    return `https://` + img_puburl
  }

  /**
   * 新浪图床1
   * https://github.com/CitronsBlog/sinaimg/blob/master/index.html
   * @param imgPath 图片路径（绝对路径）
   */
  static async sina1(imgPath: string) {
    let { code, msg, url } = await ImgBed.upload('https://www.yanwz.cn/sinaimg/sinaimg.php?type=multipart', {
      file: createReadStream(imgPath)
    })

    if (code != 200) throw Error(msg || '上传失败')

    return url
  }

  /**
   * 新浪图床2
   * https://github.com/dalaolala/4to1pic/blob/master/index.html
   * @param imgPath 图片路径（绝对路径）
   */
  static async sina2(imgPath: string) {
    let { data } = await ImgBed.upload(
      'https://apis.yum6.cn/api/5bd44dc94bcfc?token=f07b711396f9a05bc7129c4507fb65c5',
      {
        file: createReadStream(imgPath)
      }
    )

    if (data && data.url) {
      return data.url
    } else {
      throw Error('上传失败')
    }
  }

  private static async upload(url: string, formData: any) {
    try {
      let rep = await fly.upload(url, formData)
      return rep.data
    } catch (err) {
      throw err
    }
  }
}

export interface ImgBedOptions {}
