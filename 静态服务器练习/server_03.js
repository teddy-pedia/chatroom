// 使用原生方式编写web服务器
const http = require('http')
const path = require('path')

const port = 5000

http.createServer((req, res) => {
    let filename = path.basename(req.url)
    const filepath = path.join(__dirname, filename)
    console.log(filepath) // 绝对路径/Users/liningjing/Desktop/chatroom/静态服务器练习/index.html

    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    res.end('你好，电子科技大学！')
}).listen(port)
