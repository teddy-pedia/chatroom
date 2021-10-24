;(function () {
    function $(query) {
        return document.querySelector(query)
    }

    const loginBtn = $('#login-btn')
    let socket = null

    // 给登录按钮添加点击事件后的切换动画
    function onLogin() {
        // 获取用户输入的账号和密码
        let username = $('#username').value
        let password = $('#password').value

        if (!username) {
            alert('用户名不能为空')
            return
        }
        if (!password) {
            alert('密码不能为空')
            return
        }

        socket = io({
            query: {
                username: username,
                password: password,
            },
            reconnection: false,
        })

        // 监听登录返回消息
        socket.on('connect', () => {
            const login = $('#login-wrap')
            login.style.animation = 'disappear .5s'
            login.style.animationFillMode = 'forwards'

            const chat = $('#chatroom-wrap')
            chat.style.animation = 'appear .5s'
            chat.style.animationFillMode = 'forwards'

            // 获取历史消息
            socket.emit('getHistory', (data) => {
                let msgBox = $('#msg-box')
                msgBox.innerHTML = data
                    .map((val) => {
                        if (val.username === username) {
                            // 本人发送
                            return `
                                <div class="msg msg-me">
                                    <img src="./1.png" alt="" class="avator" />
                                    <div class="text">${val.content}</div>
                                </div>
                                `
                        } else {
                            // 别人发送
                            return `
                                <div class="msg">
                                    <img src="./1.png" alt="" class="avator" />
                                    <div class="text">${val.content}</div>
                                </div>
                                `
                        }
                    })
                    .join('')
            })

            // 获取聊天用户列表
            socket.on('online', (onlines) => {
                const ul = $('#friend_list')
                ul.innerHTML = onlines.map((user) => {
                    return `<li>${user}</li>`
                })
            })

            socket.on('receiveMessage', (message) => {
                let msgBox = $('#msg-box')
                let newMessage = document.createElement('div')
                newMessage.innerHTML = `
                <div class="msg">
                    <img src="./1.png" alt="" class="avator" />
                    <div class="text">${message.content}</div>
                </div>
                `
                msgBox.appendChild(newMessage)
            })
        })

        // 登录失败监听
        socket.on('connect_error', (e) => {
            console.log('connect_error', e.username)
            if (e && e.message === 'error_password') {
                alert('密码错误')
                return
            }
        })
    }
    loginBtn.addEventListener('click', onLogin)

    // 给发送按钮添加点击事件，点击之后发送消息
    function onSendMessage() {
        let input = $('#input')
        let input_text = input.value
        let msgBox = $('#msg-box')

        let div = document.createElement('div')
        div.innerHTML = `
            <div class="msg msg-me">
                <img src="./1.png" alt="" class="avator" />
                <div class="text">${input_text}</div>
            </div>
        `
        msgBox.appendChild(div)

        socket.emit('sendMessage', input_text)

        // 清空输入框消息
        input.value = ''
    }
    const sendBtn = document.getElementById('send-btn')
    sendBtn.addEventListener('click', onSendMessage)
})()
