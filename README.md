#### imgbed

imgbed 封装了常见的图床接口，调用方便



#### 已封装图床列表

- sm.ms	https://sm.ms/
- 牛图    https://www.niupic.com
- 新浪图床1    https://github.com/CitronsBlog/sinaimg/blob/master/index.html
- 新浪图床2    https://github.com/dalaolala/4to1pic/blob/master/index.html



#### 使用方式

安装 imgbed

```javascript
npm install imgbed
// yarn
yarn add imgbed
```

基本使用

```javascript
const ImgBed = require('imgbed').default

ImgBed.sm('./tupian.jpg').then(url => {
  console.log('SM：', url)
})

ImgBed.nt('./tupian.jpg').then(url => {
  console.log('牛图：', url)
})

ImgBed.sina1('./tupian.jpg').then(url => {
  console.log('新浪1：', url)
})

ImgBed.sina2('./tupian.jpg').then(url => {
  console.log('新浪2：', url)
})
```

API

```javascript
// js
const ImgBed = require('imgbed').default
// ts
import ImgBed from 'imgbed'

// 上传图片
await ImgBed.sm('/img.jpg')	// sm
await ImgBed.nt('/img.jpg')	// 牛图
await ImgBed.sina1('/img.jpg')	// 新浪1
await ImgBed.sina2('/img.jpg')	// 新浪2
```

因为 sm 对上传做了限制，牛图服务器不太稳定，所以上传可能会失败，imgbed 提供了一个依次上传直到成功的方法，使用如下

```javascript
// .js
const ImgBed = require('imgbed').default
// .ts
import ImgBed from 'imgbed'

// 依次按照 sm -> nt -> sina1 -> sina2 上传
await ImgBed.up('/img.jpg')

// 自定义上传次序：nt -> sm，此时牛图上传失败则会切换到 sm 上传
await ImgBed.up('/img.jpg', 'nt', 'sm')

// 自定义上传次序：nt -> sinal -> sina2 -> sm
await ImgBed.up('/img.jpg', 'nt', 'sinal', 'sina2', 'sm')
```





