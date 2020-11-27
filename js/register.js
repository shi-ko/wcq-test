 //输入框及验证，验证条件和提示语句
 (function () {
     var box = document.getElementsByClassName('left')[0]
     var inp = box.getElementsByTagName('input')
     var btn = box.getElementsByTagName('a')
     var veriCode = new GVerify('variCode')

     //提示语句 顺序为空 正确 错误
     var tips = [
         ['请输入手机号！', '√', '请输入正确的手机号！'],

         [
             '请输入密码！', '√', '请输入正确的密码！'
         ],
         [
             '请输入密码！', '√', '请输入正确的密码！'
         ],
         [
             '请输入验证码！', '√', '请输入正确的验证码！'
         ],
         [
             '请输入验证码！', '√', '请输入正确的验证码！'
         ]
     ]
     //条件 返回布尔的函数构成的数组
     var condition = [
         function () {
             return (/^1[0-9]{10}$/.test(this.value))
         },
         function () {
             return (/^\w{6,10}$/.test(this.value))
         },
         function () {
             return this.value == this.offsetParent.children[1].children[0].value
         },
         function () {
             return veriCode.validate(this.value)
         },
         function () {
             return (/\w+/.test(this.value))
         }
     ]

     checkall(inp, tips, condition, box)

     //发送短信按钮
     btn[1].onclick = my

     function my() {
         clearInterval(btn[1].timer)
         var count = 10
         btn[1].timer = setInterval(function () {
             count--
             btn[1].innerHTML = count + '秒后可再次发送'
             btn[1].onclick = null
             if (count < 1) {
                 btn[1].onclick = my
                 btn[1].innerHTML = '再次发送'
                 clearInterval(btn[1].timer)
             }
         }, 1000)

     }

 })();