const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const http = require('http')
const socketIO = require('socket.io')
const hostname = 'localhost'
const port = 3000
// 创建一个Koa实例对象
const app = new Koa()

const sockets = {}
const history = []

const server = http.createServer(app.callback())
const io = socketIO(server)
// 验证用户
io.use((socket, next) => {
    console.log('a client comming')
    let username = socket.handshake.query.username
    let password = socket.handshake.query.password
    if (!username) {
        console.log('拒绝连接：用户名为空')
        next(new Error('empty'))
        return
    }
    if (password !== '111') {
        console.log('拒绝连接：密码错误')
        next(new Error('error_password'))
        return
    }
    next()
})

io.on('connection', (socket) => {
    let username = socket.handshake.query.username
    console.log(`${username}登录`)

    sockets[username] = socket

    // 广播发送在线的用户
    io.emit('online', Object.keys(sockets))

    socket.on('sendMessage', (content) => {
        const message = {
            username,
            date: new Date(),
            content,
        }
        history.push(message)
        socket.broadcast.emit('receiveMessage', message)
    })

    socket.on('getHistory', (fn) => {
        fn(history)
    })

    socket.on('disconnect', (reason) => {
        delete sockets[username]
        io.sockets.emit('online', Object.keys(sockets))
        console.log(`${username}断开连接，因为${reason}`)
    })
})

app.use(serve(path.join(__dirname, 'web')))

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`)
})
