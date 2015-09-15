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

function pictureLoad(){
   $(".preload").each(function() {
        var $this = $(this);
        var src = $this.data("source");
        if($this.hasClass("mobile-img") && platform.isMobile){
            src = src.replace(".","_mobile.");
        }
        var img = $("<img>").attr({
            src: src,
            alt: ''
        });
        $this.append(img);
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



preloadImgs('.preload', function(){
    $('.loading').hide();
    $('body').addClass('opened');
});

