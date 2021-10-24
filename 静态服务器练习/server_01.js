// 使用原生方式编写web服务器
const http = require('http')

const port = 5000

http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    res.end('你好，电子科技大学！')
}).listen(port)
