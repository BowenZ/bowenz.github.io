// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

var $window = $(window),
    $html = $("html"),
    $body = $('body');

function testPlatform() {
    var ua = window.navigator.userAgent.toLowerCase(); 
    // alert(ua);
    window.platform = {
        isWX: ua.match(/micromessenger/i) !== null,
        isiPad: ua.match(/ipad/i) !== null,
        isiPhone: ua.match(/iphone/i) !== null,
        isAndroid: ua.match(/android/i) !== null,
        isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
        isAndroid404: ua.match(/android 4\.0\.4/i) !== null,
        isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
        isAndroid422: ua.match(/android 4\.2\.2/i) !== null,
        isAndroid43: ua.match(/android 4\.3/i) !== null,
        isS3: ua.match(/gt\-i9300/i) !== null,
        isS4: ua.match(/gt\-i9500/i) !== null,
        isS5: ua.match(/sm\-g900p/i) !== null,
        isNote3: ua.match(/sm\-n900/i) !== null,
        isIE: /(msie|trident)/i.test(navigator.userAgent), //window.navigator.appName.indexOf("Microsoft") !== -1,
        isIE8: ua.match(/msie 8/) !== null,
        ltIE9: $("html").hasClass("lt-ie9"),
        isChrome: ua.match(/Chrome/gi) !== null,
        isFirefox: ua.match(/firefox/gi) !== null,
        isWebkit: ua.match(/webkit/gi) !== null,
        isOpera: ua.match(/opera/gi) !== null,
        isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && ua.match(/Mobile/i) !== null
    };

    window.platform.isAndroidPad = platform.isAndroid && !platform.isMobile;
    window.platform.isTablet = platform.isiPad || platform.isAndroidPad;
    window.platform.isDesktop = !(platform.isMobile || platform.isTablet);
    window.platform.isIOS = platform.isiPad || platform.isiPhone;

    window.platform.isIOS5 = window.platform.isIOS && ua.match(/os 5/i) !== null;
    window.platform.isIOS6 = window.platform.isIOS && ua.match(/os 6/i) !== null;
    window.platform.isIOS7 = window.platform.isIOS && ua.match(/os 7/i) !== null;

    if (platform.isMobile) $html.addClass('mobile');
    if (platform.isAndroid) $html.addClass('android');
    if (platform.isTablet) $html.addClass('tablet');
    if (platform.isiPad) $html.addClass('ipad');
    if (platform.isDesktop) $html.addClass('desktop');
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

testPlatform();

