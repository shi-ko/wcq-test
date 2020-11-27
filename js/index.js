// 首页相关js
(function () {
    //banner轮播图

    (function () {
        var banner = document.getElementsByClassName('banner')[0]
        var oul = banner.getElementsByTagName('ul')[0]
        var img = oul.getElementsByTagName('li')
        var btn = banner.getElementsByClassName('btn')
        var p = banner.getElementsByTagName('p')[0]
        var order = p.getElementsByTagName('span')
        var count = 0
        var timer = null
        var width = parseInt(getStyle(img[0], 'width'))
        oul.appendChild(oul.children[0].cloneNode(true)) //克隆第一张图片放至末尾
        timer = setInterval(auto, 3000)

        btn[0].onclick = function () {
            count--
            if (count < 0) {
                count = img.length - 2

            }
            change()
        }

        btn[1].onclick = function () {
            count++
            if (count > img.length - 2) {
                count = 0
            }
            change()

        }


        for (var i = 0; i < order.length; i++) {
            order[i].index = i
            order[i].onclick = function () {
                for (k = 0; k < order.length; k++) {
                    order[k].className = '';
                }
                this.className = 'active';
                count = this.index
                change()
            }
        }

        banner.onmouseenter = function () {
            clearInterval(timer)
        }
        banner.onmouseleave = function () {
            clearInterval(timer)
            timer = setInterval(auto, 3000)

        }

        function change() {
            for (var i = 0; i < order.length; i++) {
                order[i].className = ''
                order[count].className = 'active'
            }
            var obj = {
                left: -count * width
            }
            move(oul, obj, 20)
        }

        function auto() {
            if (count >= img.length - 1) {
                count = 0
                oul.style.left = 0

            }
            count++
            if (count > order.length - 1) {
                for (var i = 0; i < order.length; i++) {
                    order[i].className = ''
                    order[0].className = 'active'
                }
            } else {
                for (var i = 0; i < order.length; i++) {
                    order[i].className = ''
                    order[count].className = 'active'
                }
            }

            var obj = {
                left: -count * width
            }
            move(oul, obj, 20)

        }

    })();


    //鼠标划上切换图片
    (function () {
        var box = document.getElementsByClassName('hover')[0]
        var img = box.getElementsByTagName('img')
        var list = box.getElementsByTagName('ul')[0]
        var title = list.getElementsByTagName('li')
        var n = 0
        list.onmouseover = function (ev) {
            var ev = ev || event
            var target = ev.target || ev.srcElement
            n = changePage(target, title)

            for (var i = 0; i < img.length; i++) {
                img[i].src = ''
            }
            img[n].src = img[n].getAttribute('_src')

        }
    })();

    //鼠标划上切换选项卡
    ajax('get', '../../data/course.json', null, function (data) {
        data = JSON.parse(data)
        qaq(0, data)
        qaq(1, data)
        qaq(2, data)

    })

    function qaq(i, data) {
        var box = document.getElementsByClassName('page-list')[i]
        var topic = box.getElementsByClassName('topic')[0]
        var list = topic.getElementsByTagName('ul')[0]
        var title = topic.getElementsByTagName('li')
        var n = 0
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li')
            li.innerHTML = `<a href="#">${data[i].topic}</a>`
            list.appendChild(li)

        }
        addContent(0, data, box)
        list.onmouseover = function (ev) {
            var ev = ev || event
            var target = ev.target || ev.srcElement
            n = changePage(target, title)
            addContent(n, data, box)

        }

    }

    function addContent(n, data, box) {
        var content = document.createElement('div')
        var str = ''
        var details = data[n].list
        content.className = 'content'
        for (var i = 0; i < details.length; i++) {
            str += `<ul>
            <li>
                <img src="${details[i].imgSrc}" alt="">
            </li>
            <li>
                ${details[i].title}
            </li>
            <li>
                <span>${details[i].price}</span>
                <span>${details[i].times}</span>
            </li>
        </ul>`
        }
        content.innerHTML = str
        box.replaceChild(content, box.children[1])

    }
    //右侧导航栏 点击出现
    (function () {
        var box = document.getElementsByClassName('fixed_right')[0]
        var title = box.getElementsByClassName('title')[0]

        title.onclick = function () {
            var n1 = 0
            var n2 = 0
            if (parseInt(getStyle(box, 'right')) < -100) {
                n1 = 5
                n2 = 170
            } else {
                n1 = -170
                n2 = 3
            }
            var obj1 = {
                right: n1
            }
            var obj2 = {
                right: n2
            }
            move(box, obj1, 10)
            move(title, obj2, 10)
        }

    })();

    //底部广告 点击关闭打开
    (function () {
        var box = document.getElementsByClassName('fixed_bottom')[0]
        var img = box.getElementsByTagName('img')
        var btn = box.getElementsByTagName('span')[0]

        btn.onclick = function () {
            var obj = {
                width: 0
            }
            btn.style.display = 'none'
            move(img[0], obj, 10)
            img[1].style.display = 'inline-block'
        }

        img[1].onclick = function () {
            img[1].style.display = 'none'
            var obj = {
                width: 1400
            }
            setTimeout(function () {
                btn.style.display = 'block'
            }, 700)
            move(img[0], obj, 10)
        }
    })()

    function changePage(target, title) {
        var x = 0
        for (var i = 0; i < title.length; i++) {
            title[i].className = ''
        }
        if (target.nodeName == 'LI') {
            target.className = 'active'
        } else if (target.parentNode.nodeName == 'LI') {
            target.parentNode.className = 'active'
        }
        for (var i = 0; i < title.length; i++) {
            (function () {
                if (title[i].className == 'active') {
                    x = i
                }
            })()
        }
        return x
    }

})()



