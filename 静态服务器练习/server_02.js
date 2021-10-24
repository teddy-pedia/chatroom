// 使用原生方式编写web服务器
const http = require('http')
const path = require('path')

const port = 5000

http.createServer((req, res) => {
    // 解析req请求的路径
    console.log(req.url) // /index.html
    let basename = path.basename(req.url) // index.html
    let dir = path.dirname(req.url) // /
    console.log(dir, basename)

    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    res.end('你好，电子科技大学！')
}).listen(port)
