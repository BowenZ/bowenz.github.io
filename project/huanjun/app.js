pictureLoad();
var swiper = new Swiper('.swiper-container', {
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // direction: 'vertical',
        // autoplay: 1000,
        effect: 'slide',//Could be "slide", "fade", "cube" or "coverflow"
        loop: false,
        onSlideChangeEnd: function(s){
            $pageNumber.text(s.activeIndex < 9 ? ('0' + (s.activeIndex-0+1)) : (s.activeIndex-0+1));
            fullView.setCurrentIndex(s.activeIndex);
        }
    });
var fullView = new ImgFullView('.swiper-slide');

var $sliderImgs = $('.swiper-slide img'),
    $pageNumber = $('.page-number'),
    $menu = $('.menu');

function initPage(){
    $sliderImgs.each(function(index, item){
        var $this = $(this);
        $this.css('margin-left', -$this.width()/2);
    });
    TweenMax.set($menu.find('li'), {x: 100});
}

function bindEvents(){
    $('.menu-button').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $menu.find('li').each(function(index, item){
                TweenMax.to(item, .2, {x: 0, delay: index * 0.05, ease: Cubic.easeOut});
            });
        }else{
            $menu.find('li').each(function(index, item){
                TweenMax.to(item, .2, {x: 100, delay: index * 0.05, ease: Cubic.easeOut});
            });
        }
    });
}

var images = new Array();
var imgLength;
var currentIndex = 0;
function preloadImgs(arrayOfImages, done) {
  imgLength = $(arrayOfImages).length;
  $(arrayOfImages).each(function(index, item) {
    images[index] = new Image();
    images[index].src = $(item).data('source');
    images[index].addEventListener("load", function() {
        if(++currentIndex == imgLength){
          done();
          images = null;
        }
        // console.log('preload img: ' + Math.ceil(currentIndex*100/imgLength) + '%...');
    });
  });
}


var $copy = $('.swiper-slide .copy');
var index = 0;
function playAni(){
    $copy.css('background-position', '0 ' + (index*-300)+'px');
    index++;
    if(index == 29) return;
    setTimeout(function() {
        playAni();
    }, 100);
}

preloadImgs('.preload', function(){
    initPage();
    bindEvents();
    setTimeout(function() {
        $window.scrollTop(0);
        $('.loading').hide();
    }, 100);
    
    $body.addClass('opened');
    setTimeout(function() {
        playAni();
    }, 500);
});

