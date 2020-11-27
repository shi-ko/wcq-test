//注册和登录界面检查输入
function checkall(inp, tips, condition, form) {
    for (var i = 0; i < inp.length - 1; i++) {
        (function (i) {
            inp[i].onblur = function () {
                var obj = new CheckInp(inp[i], tips[i], condition[i])
                var flag = obj.check()
                obj.add(flag)
                return flag
            }
        }(i));
    };

    //提交按钮
    form.onsubmit = function () {
        var arr = []
        for (var i = 0; i < inp.length - 1; i++) {
            arr.push(inp[i].onblur())
        }
        var v = arr.every(function (value, index, array) {
            return value === true
        })

        if (v) {
            var d = 'user=' + form.user.value + '&pass=' + form.password.value; // 数据
            alert('恭喜你，注册成功了！');
            console.log(d);
            ajax('get', '../../data/qaq.json', d, function (data) {
                console.log(11111);
                console.log(data);
                console.log(JSON.parse(data));
                localStorage.setItem('user', form.user.value);
                setTimeout(function () {
                    open('index.html', '_self');
                }, 2000);

            })
        }
        return false
    }


    function CheckInp(inp, arr, condition) {
        this.inp = inp;
        this.arr = arr
        this.check = function () {
            var flag = null
            if (inp.value == '') {} else {
                flag = condition.call(this.inp)
            }
            return flag
        }

        if (!CheckInp.prototype.add) {
            CheckInp.prototype.add = function (flag) {
                var tip = document.createElement('em')
                var p = this.inp.parentNode
                var arr = this.arr
                switch (flag) {
                    case true:
                        tip.innerHTML = arr[1];
                        break;
                    case false:
                        tip.innerHTML = arr[2];
                        break;
                    case null:
                        tip.innerHTML = arr[0]
                        break
                    default:
                        break;
                }

                if (p.childNodes.length >= 3) {
                    p.replaceChild(tip, p.lastChild)
                    return
                }
                p.appendChild(tip)

            }
        }
    }
}



//根据用户名改变顶部显示
(function () {
    var header = document.getElementsByTagName('header')[0]
    var oul = header.getElementsByTagName('ul')[1]
    if (localStorage.getItem('user')) {
        oul.children[3].style.display = 'none'
        oul.children[4].style.display = 'none'
        oul.children[5].innerHTML = '用户' + localStorage.getItem('user')
        console.log(11);
        oul.children[5].onclick = function () {
            localStorage.removeItem('user')
            location.reload()
        }
    } else {
        oul.children[3].style.display = 'block'
        oul.children[4].style.display = 'block'
        oul.children[5].style.display = 'none'
    }

})()