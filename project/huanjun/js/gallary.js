/**
 * @author Bowen
 * @date 2015/08/26
 */
(function(window, $) {

    "use strict";

    if ($ === undefined) {
        throw 'need jQuery or Zepto';
        return;
    }

    var config = {
        endAlert: '已经是最后一张了',
        loop: false,
        readyCallback: function() {}
    };

    $.fn.nextGallary = function(loop) {
        if (loop && this.next().length == 0) {
            return this.parent().children().eq(0);
        }
        return this.next();
    }

    function zGallary(ele, imgs, options) {
        $.extend(config, options);

        this.$container = typeof ele == 'string' ? $(ele) : ele;
        this.imgArray = imgs;
        this.config = config;
        this.currentIndex = 0;

        this._init();
    }

    zGallary.prototype._init = function() {
        var self = this;
        var holdImg = new Image();
        holdImg.onload = self.config.readyCallback;
        self.$container.append($(holdImg).attr({
            src: self.imgArray[0],
            class: 'placeholder'
        }));
        var $gallary = $('<div class="gallary"></div>');
        self.imgArray.forEach(function(item, index) {
            $gallary.append($(new Image()).attr({
                src: item,
                class: index < 4 ? ('active' + (index - 0 + 1)) : ''
            }));
        });
        self.$container.append($gallary);
        this.queue = [$(this.$container.find('.active1')), this.$container.find('.active2'), this.$container.find('.active3'), this.$container.find('.active4')];
    };

    zGallary.prototype.next = function(direction, callback) {
        if (this.queue[1].length == 0 && !this.config.loop) {
            alert(this.config.endAlert);
            return;
        }
        var self = this;
        if (direction != 'left' && direction != 'right') direction = 'left';
        this.queue[0].addClass('animation-' + direction).removeClass('active1').delay(310).queue(function() {
            $(this).removeClass('animation-' + direction).dequeue();
        });
        this.queue[0] = this.queue[1].addClass('animation1').removeClass('active2').delay(310).queue(function() {
            $(this).addClass('active1').removeClass('animation1').dequeue();
        });
        this.queue[1] = this.queue[2].addClass('animation2').removeClass('active3').delay(310).queue(function() {
            $(this).addClass('active2').removeClass('animation2').dequeue();
        });
        this.queue[2] = this.queue[3].addClass('active3').removeClass('active4')
        this.queue[3] = this.queue[2].nextGallary(self.config.loop).addClass('active4');
        this.currentIndex = (this.currentIndex == this.imgArray.length - 1) ? 0 : ++this.currentIndex;
        setTimeout(function() {
            callback();
        }, 310);
    };

    zGallary.prototype.goTo = function(index, direction, callback) {
        var self = this;
        if (index == this.currentIndex || this.imgArray[index] == undefined) {
            callback();
            return;
        }
        this.currentIndex = index - 1;
        this.queue[1].removeClass('active2');
        this.queue[2].removeClass('active3');
        this.queue[3].removeClass('active4');
        this.queue[3] = (this.queue[2] = (this.queue[1] = this.$container.find('.gallary>img').eq(index).addClass('active2')).nextGallary(self.config.loop).addClass('active3')).nextGallary(self.config.loop).addClass('active4');
        setTimeout(function() {
            self.next(direction, callback);
        }, 40);
    };

    window.zGallary = zGallary;

})(window, window.jQuery || window.Zepto);

var gallary,
    $submenu = $('.sub-menu'),
    $mainMenu = $('.main-menu');

function initPage() {
    gallary = new zGallary('.gallary-container', ["img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg",
        "img/gallary/2.jpg"
    ], {
        loop: true,
        readyCallback: function() {
            setTimeout(function() {
                $(window).trigger('resize');
                $('.loading').hide();
            }, 30);
            if ($('html').hasClass('x5')) {
                var $wrapper = $('.wrapper');
                $wrapper.find('.choice').height($wrapper.height() - ($wrapper.find('.gallary-container').height() + $wrapper.find('.footer').height() + 60));
            }
        }
    });

    if (navigator.userAgent.match(/MQQBrowser/i)) {
        $('html').addClass('x5');
    }

    var menu = [{
        room: '客厅',
        positions: ['正门', '窗户', '沙发', '电视']
    }, {
        room: '餐厅',
        positions: ['餐桌', '冰箱', '窗户']
    }, {
        room: '卧室',
        positions: ['床', '床头柜', '衣柜', '梳妆台', '配件']
    }, {
        room: '书房',
        positions: ['书桌', '椅子', '书柜', '窗户']
    }];

    var counter = 0;
    menu.forEach(function(item, index) {
        $mainMenu.find('ul').append('<li data-index="' + counter + '">' + item.room + '</li>');
        var $ul = $('<ul class="menu clearfix"></ul>');
        if (index == 0) {
            $ul.addClass('active');
            $mainMenu.find('li').eq(0).addClass('active');
        }
        item.positions.forEach(function(position, index) {
            $ul.append('<li data-index="' + (counter++) + '">' + position + '</li>');
        });
        $ul.find('li').eq(0).addClass('active')
        $submenu.append($ul);
    });
}

function bindEvents() {
    var gallaryLock = false,
        choices = [];

    $mainMenu.on('touchstart', 'li', function() {
        if (!gallaryLock) {
            gallaryLock = true;
            $mainMenu.find('.active').removeClass('active');
            $(this).addClass('active');
            $submenu.find('ul.active').removeClass('active').find('li.active').removeClass('active');
            $submenu.find('ul').eq($(this).index()).addClass('active').find('li:eq(0)').addClass('active');
            gallary.goTo($(this).data('index'), 'left', function() {
                gallaryLock = false;
            });
            setTimeout(function() {
                $('.btn-container .button').removeClass('active').eq(choices[gallary.currentIndex]).addClass('active');
            }, 50);
        }
    });

    $submenu.find('ul').on('touchstart', 'li', function() {
        if (!gallaryLock) {
            gallaryLock = true;
            $submenu.find('li.active').removeClass('active');
            $(this).addClass('active');
            gallary.goTo($(this).data('index'), 'left', function() {
                gallaryLock = false;
            });
            setTimeout(function() {
                $('.btn-container .button').removeClass('active').eq(choices[gallary.currentIndex]).addClass('active');
            }, 50);
        }
    });


    $('.choice').on('touchstart', '.btn', function() {
        if (!gallaryLock) {
            gallaryLock = true;

            var direction = $(this).hasClass('btn-left') ? 'left' : 'right';
            if (direction == 'left') {
        		choices[gallary.currentIndex] = 0;
            }else{
            	choices[gallary.currentIndex] = 1;
            }

            gallary.next(direction, function() {
                gallaryLock = false;
            });
            setTimeout(function() {
                $('.btn-container .button').removeClass('active').eq(choices[gallary.currentIndex]).addClass('active');
            }, 50);

            var $targetLi = $submenu.find('li[data-index="' + gallary.currentIndex + '"]');
            if (!$targetLi.parent().hasClass('active')) {
                $submenu.find('ul.active').removeClass('active');
                $targetLi.parent().addClass('active');
            }
            $submenu.find('li.active').removeClass('active');
            $targetLi.addClass('active');
            if ($mainMenu.find('li[data-index="' + gallary.currentIndex + '"]').length == 1) {
                $mainMenu.find('li.active').removeClass('active');
                $mainMenu.find('li[data-index="' + gallary.currentIndex + '"]').addClass('active');
            }
        }
    });
    
    $(window).on('resize', function(){
        if($('.choice').height() < 75 && $(window).width() < $(window).height()){
            $('.wrapper').addClass('small');
            if($('.choice').height() < 70 && $('.wrapper').hasClass('small') && $(window).width() < $(window).height()){
                $('.wrapper').addClass('very-small');
            }
        }else if($('.choice').height() > 140){
            $('.wrapper').removeClass('small');
        }
    });
}

initPage();
bindEvents();

// $(window).click(function(event) {
//     alert($('.choice').height());
// });