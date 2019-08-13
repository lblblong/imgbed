"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fly = require('flyio');
const fs_1 = require("fs");
class ImgBed {
    /**
     * 挨个上传，直到上传成功为止
     * @param imgPath  图片路径（绝对路径）
     * @param beds 图床列表，默认为所有：'sm', 'nt', 'sina1', 'sina2'
     */
    static up(imgPath, ...beds) {
        if (beds.length == 0) {
            beds = ['sm', 'nt', 'sina1', 'sina2'];
        }
        return new Promise((res, rej) => {
            let pro = Promise.reject();
            for (const bed of beds) {
                pro = pro.catch(_ => ImgBed[bed](imgPath)).then(url => res(url));
            }
            pro.catch(err => rej(err));
        });
    }
    /**
     * 上传图片（SM）
     * https://sm.ms/
     * @param imgPath 图片路径（绝对路径）
     */
    static async sm(imgPath) {
        let { code, msg, data } = await ImgBed.upload('https://sm.ms/api/upload', {
            smfile: fs_1.createReadStream(imgPath)
        });
        if (code == 'exception')
            throw Error(msg || '上传失败');
        return data.url;
    }
    /**
     * 上传图片（牛图）
     * https://www.niupic.com
     * @param imgPath 图片路径（绝对路径）
     */
    static async nt(imgPath) {
        let { img_puburl } = await ImgBed.upload('https://www.niupic.com/api/upload', {
            image_field: fs_1.createReadStream(imgPath)
        });
        if (!img_puburl)
            throw Error('上传失败');
        return `https://` + img_puburl;
    }
    /**
     * 新浪图床1
     * https://github.com/CitronsBlog/sinaimg/blob/master/index.html
     * @param imgPath 图片路径（绝对路径）
     */
    static async sina1(imgPath) {
        let { code, msg, url } = await ImgBed.upload('https://www.yanwz.cn/sinaimg/sinaimg.php?type=multipart', {
            file: fs_1.createReadStream(imgPath)
        });
        if (code != 200)
            throw Error(msg || '上传失败');
        return url;
    }
    /**
     * 新浪图床2
     * https://github.com/dalaolala/4to1pic/blob/master/index.html
     * @param imgPath 图片路径（绝对路径）
     */
    static async sina2(imgPath) {
        let { data } = await ImgBed.upload('https://apis.yum6.cn/api/5bd44dc94bcfc?token=f07b711396f9a05bc7129c4507fb65c5', {
            file: fs_1.createReadStream(imgPath)
        });
        if (data && data.url) {
            return data.url;
        }
        else {
            throw Error('上传失败');
        }
    }
    static async upload(url, formData) {
        try {
            let rep = await fly.upload(url, formData);
            return rep.data;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = ImgBed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1nQmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0ltZ0JlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUMxQiwyQkFBcUM7QUFFckMsTUFBcUIsTUFBTTtJQUN6Qjs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFlLEVBQUUsR0FBRyxJQUFjO1FBQzFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7U0FDdEM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLElBQUksR0FBRyxHQUFRLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUMvQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUNqRTtZQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM1QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBZTtRQUM3QixJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUU7WUFDeEUsTUFBTSxFQUFFLHFCQUFnQixDQUFDLE9BQU8sQ0FBQztTQUNsQyxDQUFDLENBQUE7UUFFRixJQUFJLElBQUksSUFBSSxXQUFXO1lBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFBO1FBRW5ELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQWU7UUFDN0IsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRTtZQUM1RSxXQUFXLEVBQUUscUJBQWdCLENBQUMsT0FBTyxDQUFDO1NBQ3ZDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxVQUFVO1lBQUUsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFcEMsT0FBTyxVQUFVLEdBQUcsVUFBVSxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBZTtRQUNoQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMseURBQXlELEVBQUU7WUFDdEcsSUFBSSxFQUFFLHFCQUFnQixDQUFDLE9BQU8sQ0FBQztTQUNoQyxDQUFDLENBQUE7UUFFRixJQUFJLElBQUksSUFBSSxHQUFHO1lBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFBO1FBRTNDLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFlO1FBQ2hDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQ2hDLCtFQUErRSxFQUMvRTtZQUNFLElBQUksRUFBRSxxQkFBZ0IsQ0FBQyxPQUFPLENBQUM7U0FDaEMsQ0FDRixDQUFBO1FBRUQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUE7U0FDaEI7YUFBTTtZQUNMLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3BCO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxRQUFhO1FBQ3BELElBQUk7WUFDRixJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ3pDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQTtTQUNoQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxHQUFHLENBQUE7U0FDVjtJQUNILENBQUM7Q0FDRjtBQTdGRCx5QkE2RkMifQ==