//video 控件
(function () {
    var box = document.getElementsByClassName('video')[0]
    var video = box.getElementsByClassName('left')[0]
    var mp4 = video.getElementsByTagName('video')[0]
    var btn = video.getElementsByClassName('btn')
    var playTime = video.getElementsByClassName('play_time')[0]
    var fullTmie = video.getElementsByClassName('full_time')[0]
    var bar = video.getElementsByTagName('em')[0]
    var list = box.getElementsByClassName('right')[0]
    var li = list.getElementsByTagName('li')
    var flag = true
    var full = true
    //播放和暂停按钮
    btn[0].onclick = function () {

        if (flag) {
            mp4.play()
            this.className = 'pause btn'
        } else {
            mp4.pause()
            this.className = 'play btn'

        }

        flag = !flag
    }

    //视频加载完显示时长
    mp4.onloadedmetadata = function () {
        var str = ''
        if (Math.floor(mp4.duration) < 10) {
            str = '0' + Math.floor(mp4.duration)
        } else {
            str = Math.floor(mp4.duration)
        }
        fullTmie.innerHTML = '00:00:' + str + ''
        playTime.innerHTML = '00:00:00'
    }

    //进度条变动 时间更新
    mp4.ontimeupdate = function () {
        var str = ''
        if (Math.floor(mp4.currentTime) < 10) {
            str = '0' + Math.floor(mp4.currentTime)
        } else {
            str = Math.floor(mp4.currentTime)
        }

        playTime.innerHTML = '00:00:' + str + ''
        var x = 370 * mp4.currentTime / mp4.duration;
        var obj = {
            width: x
        }
        move(bar, obj, 1);


    }

    btn[1].onmousedown = function (ev) {
        var w = bar.style.width
        var qaq = ev.clientX
        if (parseInt(w)) {
            w = parseInt(w)
        } else {
            w = 0
        }
        document.onmousemove = function (ev) {
            var obj = {
                width: ev.clientX - qaq + w
            }

            if (obj.width >= 370) {
                return
            } else {
                move(bar, obj, 1);

            }
            mp4.currentTime = obj.width / 370 * mp4.duration

            return false
        }

        document.onmouseup = function (ev) {
            bar.style.width = ev.clientX - qaq + w
            document.onmousemove = null
            document.onmouseup = null
        }

        return false
    }


    btn[2].onclick = function () {

        if (full) {
            mp4.requestFullscreen()
        }
    }

    list.onclick = function (ev, target) {
        var ev = ev || event
        var target = ev.target || ev.srcElement
        if (target.nodeName == 'LI') {
            mp4.src = target.getAttribute('_src');
            bar.style.width = 0
            btn[0].className = 'play btn'
            flag = true
        }
    }
})();

// 点击评论

(function () {
    var box = document.querySelector('.content .right')
    var btn = box.getElementsByTagName('button')[0]
    var text = box.getElementsByTagName('textarea')[0]
    var star = box.getElementsByTagName('p')[0]
    var comment = box.getElementsByClassName('comment')[0]
    var span = star.getElementsByTagName('span')
    console.log(span);
    for (var i = 0; i < 5; i++) {
        span[i].index = i + 1
    }
    var count = 0
    star.onclick = function (ev, target) {
        var ev = ev || event;
        var target = ev.target || ev.srcElement
        if (count == target.index) {
            count = 0
            star.style.backgroundPositionY = 0
        } else {
            count = target.index
            star.style.backgroundPositionY = -46.5 * count + 'px'
        }


    }
    btn.onclick = function () {
        console.log(text.value);
        if (text.value == '') {
            alert('留下点什么吧')
            return
        }
        var comStar = document.createElement('p')
        comStar.className = 'star'
        comStar.style.backgroundPositionY = -46.5 * count + 'px'
        var content = document.createElement('p')
        var hr = document.createElement('hr')
        content.innerHTML = text.value
        comment.appendChild(comStar)
        comment.appendChild(content)
        comment.appendChild(hr)


    }
})()