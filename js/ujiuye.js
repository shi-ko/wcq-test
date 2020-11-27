/* 
* getStyle(obj,attr)  获取非行间样式 只能获取被显式书写的样式
*parmas {object}  obj  元素
*parmas {string}  attr 样式名
*/


function getStyle(obj, attr) {
    if (window.getComputedStyle) { //如果存在就是真  标准浏览器
        return getComputedStyle(obj)[attr]
    } else { //IE
        return obj.currentStyle[attr]
    }
}

/* 
* random(min,max)  几到几之间的随机数 (包含最大值和最小值)
*parmas {number}  min  最小值
*parmas {number}  max  最大值
*/

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


/* 
* move(ele, json, speed, callback) 元素运动
*parmas {object}  ele  元素
*parmas {object}  json 由，需要运动的样式：目标值；组成的对象
*                   {width: 500,
                    height: 300,
                    opacity: 30}
*parmas {number}  speed  运动的速率
*parmas {function}}  callback   回调函数
*/

function move(ele, json, speed, callback) {
    clearInterval(ele.timer); // 先清，再开

    ele.timer = setInterval(function () {
        var onOff = true;    //设置开关

        // attr即样式名，target即目标
        for (var attr in json) {
            var target = json[attr];

            if (attr === 'opacity') {
                var now = getStyle(ele, attr) * 100; // 当前的位置
            } else {
                var now = parseInt(getStyle(ele, attr)); // 当前的位置
            }

            var dir = (target - now) / speed; // 方向
            dir = dir > 0 ? Math.ceil(dir) : Math.floor(dir);

            now += dir; // 下一步要运动到的位置

            if ((now >= target && dir > 0) || (now <= target && dir < 0)) {
                now = target;
            }

            if (attr === 'opacity') {       //适用透明度
                ele.style.opacity = now / 100;
                ele.style.filter = 'alpha(opacity = ' + now + ')';
            } else {
                ele.style[attr] = now + 'px';
            }

            if (now !== target) {
                onOff = false;  //只要循环中有一个now!==target，开关就为false
            }
        }

        if (onOff) {        //开关为true即停止定时器
            clearInterval(ele.timer);
            callback && callback.call(ele);
        }
    }, 30);
}



//获取元素到body的距离，从左边的距离为left，从顶边的距离为top
//ele为元素
function getPos(ele) {
    var l = 0;
    var t = 0;

    while (ele) {
        // console.log(ele);
        l += ele.offsetLeft;
        t += ele.offsetTop;
        ele = ele.offsetParent;
    }

    return {
        left: l,
        top: t
    }
}


//事件绑定兼容处理
//obj 为被绑定事件的对象
//event 为绑定的事件
//callback 为触发的函数
function bind(obj, event, callback) {
    if (obj.addEventListener) {
        obj.addEventListener(event, callback, false);
    } else {
        obj.attachEvent('on' + event, callback);
    }
}

//事件解绑兼容处理
//obj 为被绑定事件的对象
//event 为绑定的事件
//callback 为触发的函数
function unbind(obj, event, callback) {
    if (obj.removeEventListener) {
        obj.removeEventListener(event, callback, false);
    } else {
        obj.detachEvent('on' + event, callback);
    }
}


//阻止事件冒泡兼容处理
// ev=函数的事件
//var ev= ev || event
function stopPropagation(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else {
        ev.cancelBubble = true;
    }
}



//阻止默认事件的兼容性处理
// ev=函数的事件
//var ev= ev || event
function preventDefault(ev) {
    if (ev.preventDefault) {
        // 标准浏览器
        ev.preventDefault();
    } else {
        // IE8及以下
        ev.returnValue = false;
    }
}

//拖拽事件
//ele为可被拖拽的元素
function drag(ele) {
    // 按下
    ele.onmousedown = function (ev) {
        var ev = ev || event;
        var disX = ev.clientX - ele.offsetLeft; // 按下时，鼠标到盒子的距离
        var disY = ev.clientY - ele.offsetTop;

        var clientW = document.documentElement.clientWidth; // 可视区的宽高
        var clientH = document.documentElement.clientHeight;
        var boxW = ele.clientWidth; // 盒子的宽高
        var boxH = ele.clientHeight;

        // 设置全局捕获（兼容IE8及以下）
        if (ele.setCapture) {
            ele.setCapture();
        }

        // 拖动
        document.onmousemove = function (ev) {
            var ev = ev || event;
            var l = ev.clientX - disX;
            var t = ev.clientY - disY;

            if (l < 0) {
                l = 0;
            } else if (l > clientW - boxW) {
                l = clientW - boxW;
            }

            if (t < 0) {
                t = 0;;
            } else if (t > clientH - boxH) {
                t = clientH - boxH;
            }

            ele.style.left = l + 'px';
            ele.style.top = t + 'px';
        }

        // 抬起
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;

            // 释放全局捕获（兼容IE8及以下）
            if (ele.releaseCapture) {
                ele.releaseCapture();
            }
        }

        return false; // 标准浏览器支持
    }
}

//ajax 从后台获取数据
// 参数：请求的方式, 请求的地址, 要传给后端的数据, 回调函数
function ajax(methods, url, data, callback) {
    // 第一步 创建异步对象
    var xhr = new XMLHttpRequest();

    //使用open方法设置和服务器的交互信息
    if (methods === 'get') {
        // get请求
        if (data) {
            url += '?' + data;
        }
        xhr.open('get', url, true);
        xhr.send();
    } else {
        // post请求
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    //注册事件被更改时会调用
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功了
                callback && callback(xhr.responseText);
            } else {
                // 失败
                throw new Error('ajax请求失败，失败的状态码是：' + xhr.status);
            }
        }
    }
}


