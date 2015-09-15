---
layout: post
title:  "imgFullview--基于重力感应的图片浏览插件"
date:   2015-09-15 14:42:42
categories: technology js
tags: js插件
---

这几天项目中遇到了一个问题：在手机竖屏状态下查看16:9尺寸的图片时，如果使图片宽度100%的话，由于图片的比例，手机上下会有空白处，而且图片整体比较小，体验不是很好。

然后我们想到了一个解决办法：让图片高度100%，保持居中，当手机倾斜时，图片会随着倾斜角度变化而左右移动，这样既好玩又能保持图片填满整个屏幕。

那么既然要这么做，我就直接写了一个简单的JS插件出来，以备不时之需。

[Demo Page](/demo/2015-09-15-imgFullview/) *需用手机查看*
[Github地址](https://github.com/BowenZ/imgFullView)

先附上源代码：

{% highlight JavaScript linenos %}
(function(window, $, TweenMax) {
    function ImgFullView(el, options) {
    	if (typeof window.DeviceOrientationEvent == 'undefined') {
    		console.error('DeviceOrientationEvent is not supported on this device');
    		return false;
    	}
        this.$wrapper = typeof el == 'string' ? $(el) : el;
        this.$imgs = this.$wrapper.find('>img');
        this.options = {
        	time: 60,
        	sensitivity: 8
        };
        this.orientationLock = false;
        this.currentIndex = 0;

        this._init();
    }

    ImgFullView.prototype._init = function() {
    	var self = this;
    	window.addEventListener("deviceorientation", function(orientData) {
            // var absolute = orientData.absolute;
            // var alpha = orientData.alpha;
            // var beta = orientData.beta;
            if(self.orientationLock) return;
            orientationLock = true;
            setTimeout(function() {orientationLock = false}, self.options.time);
            var gamma = orientData.gamma;
            var n = gamma > 0 ? 1 : -1;
            // console.log(gamma);
            gamma = Math.abs(gamma) > 28 ? 28 * n : gamma;
            TweenMax.set(self.$imgs.eq(self.currentIndex), {x: gamma * self.options.sensitivity});
        }, true);
    };

    ImgFullView.prototype.setCurrentIndex = function(index) {
    	this.currentIndex = index;
    };

    if (typeof module != 'undefined' && module.exports) {
        module.exports = ImgFullView;
    } else {
        window.ImgFullView = ImgFullView;
    }
})(window, jQuery, TweenMax);
{% endhighlight %}

依赖jQuery和TweenMax两个库。

由于项目时间紧迫，就先把当前用到的功能写出来了，没有做任何优化，先挖个坑，以后有时间再填...