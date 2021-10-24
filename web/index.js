window.onload = () => {
    const loginBtn = document.getElementById('login-btn')
    // 给登录按钮添加点击事件后的切换动画
    loginBtn.addEventListener('click', (e) => {
        // 获取用户输入的账号和密码
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value

        const login = document.getElementById('login-wrap')
        login.style.animation = 'disappear .5s'
        login.style.animationFillMode = 'forwards'

        const chat = document.getElementById('chatroom-wrap')
        chat.style.animation = 'appear .5s'
        chat.style.animationFillMode = 'forwards'
    })

    // 给发送按钮添加点击事件，点击之后发送消息
    const sendBtn = document.getElementById('send-btn')
    sendBtn.addEventListener('click', (e) => {
        let input = document.getElementById('input')
        let input_text = input.value
        let msg = document.createElement('div')
        msg.innerHTML = `
            <div class="msg msg-me">
                <img src="./1.png" alt="" class="avator" />
                <div class="text">${input_text}</div>
            </div>
        `
        const msgBox = document.getElementById('msg-box')
        msgBox.appendChild(msg)
        // 清空输入框消息
        input.value = ''
    })
}
