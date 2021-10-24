const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const http = require('http')
const socketIO = require('socket.io')
const hostname = '127.0.0.1'
const port = 3000
// 创建一个Koa实例对象
const app = new Koa()

const server = http.createServer(app.callback())
const io = socketIO(server)

io.on('connection', (socket) => {
    // 获取登录的用户名和密码
    const info = socket.handshake.query
    const username = info.username
    const password = info.password
    if (username === 'liningjing' && password === 'hello') {
        socket.emit('message', 'success')
    } else {
        socket.emit('message', 'error')
    }
    // 监听标识符为chatMessage发来的消息
    socket.on('chatMessage', (msg) => {
        console.log(msg) // hello from client
    })
})

app.use(serve(path.join(__dirname, 'web')))

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`)
})
