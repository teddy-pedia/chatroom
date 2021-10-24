// 使用原生方式编写web服务器
const fs = require('fs')
const http = require('http')
const path = require('path')

const port = 5000

http.createServer((req, res) => {
    let filename = path.basename(req.url)
    const filepath = path.join('../web', filename)
    const ext = path.extname(req.url).substring(1) // 获取扩展名 html / css / js ...

    res.setHeader('Content-type', `text/${ext};charset=utf-8`)

    // 查找该路径下的文件
    if (fs.existsSync(filepath)) {
        res.statusCode = 200
        fs.readFile(filepath, 'utf-8', (err, data) => {
            res.end(data)
        })
    } else {
        res.statusCode = 404
        res.end('Not found！')
    }
}).listen(port)
