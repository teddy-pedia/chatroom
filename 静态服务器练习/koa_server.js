const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
// 创建一个Koa实例对象
const app = new Koa()

app.use(serve(path.join('../web')))

app.listen(5000)
