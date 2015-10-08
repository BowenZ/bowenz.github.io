(function() {
	document.addEventListener('touchstart',function(){},false);
    var tap = (!platform.isDesktop && platform.hasTouch) ? 'touchstart' : 'click';
    $('.menu-expander').on(tap, function() {
        $('.main-menu').toggleClass('active');
        $('.page-left').toggleClass('active');
        $('.content').toggleClass('active');
    });

    $('.main-menu').find('.icon').on(tap, function() {
        $(this).toggleClass('active').next('.sub-menu').slideToggle(300);
    });;
})();
