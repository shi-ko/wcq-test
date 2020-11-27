(function () {
    var box = document.getElementsByClassName('left')[0]
    var p = box.getElementsByTagName('p')
    var inp = box.getElementsByTagName('input')
    var logIn = box.getElementsByTagName('span')[0]


    var tips = [
        ['请输入手机号！', '√', '请输入正确的手机号！'],

        [
            '请输入密码！', '√', '请输入正确的密码！'
        ]
    ]
    var condition = [
        function () {
            return (/^1[0-9]{10}$/.test(this.value))
        },
        function () {
            return (/^\w{6,10}$/.test(this.value))
        },
    ]
    checkall(inp, tips, condition, box)

})();