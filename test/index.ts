import ImgBed from '../src/ImgBed'
import { resolve } from 'path'

async function upload() {
  let img_path = resolve(__dirname, './img2.jpg')
  console.log(await ImgBed.sina1(img_path))
  console.log(await ImgBed.sina2(img_path))
  console.log(await ImgBed.nt(img_path))
  console.log(await ImgBed.sm(img_path))
}

upload()
