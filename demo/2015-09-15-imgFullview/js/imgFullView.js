/**
*@author Bowen
*@date 2015/09/14
*/

(function(window, $, TweenMax) {
    function ImgFullView(el, options) {
    	if (typeof window.DeviceOrientationEvent == 'undefined') {
    		console.error('DeviceOrientationEvent is not supported on this device');
    		return false;
    	}
        this.$wrapper = typeof el == 'string' ? $(el) : el;
        this.$imgs = this.$wrapper.find('>img');
        console.log(this.$wrapper);
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
