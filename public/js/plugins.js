(function ($) {
  $.fn.toc = function (options) {
    var defaults = {
        noBackToTopLinks: false,
        title: '<i>Jump to...</i>',
        minimumHeaders: 3,
        headers: 'h1, h2, h3, h4, h5, h6',
        listType: 'ol', // values: [ol|ul]
        showEffect: 'show', // values: [show|slideDown|fadeIn|none]
        showSpeed: 'slow', // set to 0 to deactivate effect
        classes: {
          list: '',
          item: ''
        }
      },
      settings = $.extend(defaults, options)

    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16)
      })
    }

    function createLink(header) {
      var innerText = (header.textContent === undefined) ? header.innerText : header.textContent
      return '<a href=\'#' + fixedEncodeURIComponent(header.id) + '\'>' + innerText + '</a>'
    }

    var headers = $(settings.headers).filter(function () {
        // get all headers with an ID
        var previousSiblingName = $(this).prev().attr('name')
        if (!this.id && previousSiblingName) {
          this.id = $(this).attr('id', previousSiblingName.replace(/\./g, '-'))
        }
        return this.id
      }),
      output = $(this)
    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      $(this).hide()
      return
    }

    if (0 === settings.showSpeed) {
      settings.showEffect = 'none'
    }

    var render = {
      show: function () {
        output.hide().html(html).show(settings.showSpeed)
      },
      slideDown: function () {
        output.hide().html(html).slideDown(settings.showSpeed)
      },
      fadeIn: function () {
        output.hide().html(html).fadeIn(settings.showSpeed)
      },
      none: function () {
        output.html(html)
      }
    }

    var get_level = function (ele) {
      return parseInt(ele.nodeName.replace('H', ''), 10)
    }
    var highest_level = headers.map(function (_, ele) {
      return get_level(ele)
    }).get().sort()[0]
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>'

    var level = get_level(headers[0]),
      this_level,
      html = settings.title + ' <' + settings.listType + ' class="' + settings.classes.list + '">'
    headers.on('click', function () {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id
      }
    })
      .addClass('clickable-header')
      .each(function (_, header) {
        this_level = get_level(header)
        if (!settings.noBackToTopLinks && this_level === highest_level) {
          $(header).addClass('top-level-header').after(return_to_top)
        }
        if (this_level === level) // same level as before; same indenting
          html += '<li class="' + settings.classes.item + '">' + createLink(header)
        else if (this_level <= level) { // higher level than before; end parent ol
          for (var i = this_level; i < level; i++) {
            html += '</li></' + settings.listType + '>'
          }
          html += '<li class="' + settings.classes.item + '">' + createLink(header)
        } else if (this_level > level) { // lower level than before; expand the previous to contain a ol
          for (i = this_level; i > level; i--) {
            html += '<' + settings.listType + ' class="' + settings.classes.list + '">' +
              '<li class="' + settings.classes.item + '">'
          }
          html += createLink(header)
        }
        level = this_level // update for the next one
      })
    html += '</' + settings.listType + '>'
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function () {
        $(window).scrollTop(0)
        window.location.hash = ''
      })
    }

    render[settings.showEffect]()
  }
})(jQuery)

var $html = $('html')

function testPlatform() {
  var ua = window.navigator.userAgent.toLowerCase()
  // alert(ua);
  window.platform = {
    hasTouch: 'ontouchstart' in window,
    isWX: ua.match(/micromessenger/i) !== null,
    isiPad: ua.match(/ipad/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
    isAndroid404: ua.match(/android 4\.0\.4/i) !== null,
    isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
    isAndroid422: ua.match(/android 4\.2\.2/i) !== null,
    isAndroid43: ua.match(/android 4\.3/i) !== null,
    isS3: ua.match(/gt-i9300/i) !== null,
    isS4: ua.match(/gt-i9500/i) !== null,
    isS5: ua.match(/sm-g900p/i) !== null,
    isNote3: ua.match(/sm-n900/i) !== null,
    isIE: /(msie|trident)/i.test(navigator.userAgent), //window.navigator.appName.indexOf("Microsoft") !== -1,
    isIE8: ua.match(/msie 8/) !== null,
    ltIE9: $('html').hasClass('lt-ie9'),
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    isWebkit: ua.match(/webkit/gi) !== null,
    isOpera: ua.match(/opera/gi) !== null,
    isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && ua.match(/Mobile/i) !== null
  }

  window.platform.isAndroidPad = platform.isAndroid && !platform.isMobile
  window.platform.isTablet = platform.isiPad || platform.isAndroidPad
  window.platform.isDesktop = !(platform.isMobile || platform.isTablet)
  window.platform.isIOS = platform.isiPad || platform.isiPhone

  window.platform.isIOS5 = window.platform.isIOS && ua.match(/os 5/i) !== null
  window.platform.isIOS6 = window.platform.isIOS && ua.match(/os 6/i) !== null
  window.platform.isIOS7 = window.platform.isIOS && ua.match(/os 7/i) !== null

  if (platform.isMobile) $html.addClass('mobile')
  if (platform.isAndroid) $html.addClass('android')
  if (platform.isTablet) $html.addClass('tablet')
  if (platform.isiPad) $html.addClass('ipad')
  if (platform.isDesktop) $html.addClass('desktop')
}

testPlatform()