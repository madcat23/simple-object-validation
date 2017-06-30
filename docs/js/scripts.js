 /* global window, document, $ */

$(window).on('hashchange', function() {
  $('.nav-side-menu a').each(function() {
    if ($(this).attr('href') == window.location.hash) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })
}).trigger('hashchange')

$('.menu-content a').click(function() {
  $('.menu-content a').removeClass('active')
  $(this).addClass('active')
})

$(window).on('scroll', function(event) {
  var $headlines = $('h1[id], h2[id]')
  var $menuContent = $('#menu-content')
  var $navSideMenu = $('.nav-side-menu')
  var sideMenuHeight = $navSideMenu.outerHeight()
  var sideMenuScrollPosition = $navSideMenu.scrollTop()
  $menuContent.find('a').removeClass('active')
  var globalScrollPosition = $(window).scrollTop()

  var passedHeadlines = []
  $headlines.each(function() {
    var $headline = $(this)
    var headlineOffsetToViewport = $headline.offset().top - globalScrollPosition

    if (headlineOffsetToViewport <= 5) {
      passedHeadlines.push(this)
    }
  })

  var $currentHeadline = $(passedHeadlines.pop())

  if ($currentHeadline) {
    var $menuItem = $menuContent.find('a[href=\\#' + $currentHeadline.attr('id') + ']')

    if ($menuItem.length > 0) {
      $menuItem.addClass('active')
      var menuItemPosition = $menuItem.offset().top
      var itemOffset = menuItemPosition - globalScrollPosition
      if (itemOffset < 0) {
        var newScrollPosition = menuItemPosition - globalScrollPosition + sideMenuScrollPosition
        $navSideMenu.scrollTop(newScrollPosition)
      } else if (itemOffset > sideMenuHeight) {
        var newScrollPosition = menuItemPosition - globalScrollPosition + sideMenuScrollPosition - sideMenuHeight + $menuItem.outerHeight() - 1
        $navSideMenu.scrollTop(newScrollPosition)
      }
    }
  }

  function myScroll(offset) {
    if(window.scroll) {
      window.scroll({
        top: 2500, 
        left: 0, 
        behavior: 'smooth' 
      });
    } else {

    }
  }
}).trigger('scroll')

$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block)
  })

  var allFunktions = [
    ["isRequired","#is-required"],
    ["isEmail","#is-email"],
    ["isAlphanumeric","#is-alphanumeric"],
    ["isNumeric","#is-numeric"],
    ["isInteger","#is-integer"],
    ["isBetween","#is-between"],
    ["isGreaterThanOrEqual","#is-greater-than-or-equal"],
    ["isLessThanOrEqual","#is-less-than-or-equal"],
    ["chain","#chain"],
    ["assemble","#assemble"],
    ["validator","#validator"],
  ]
  for (var i = 0; i < allFunktions.length; i++) {
    var funktion = allFunktions[i]
    var text = funktion[0]
    var link = funktion[1]
    var regExp = new RegExp(text, 'g')
    $('pre').each(function() {
      var html = $(this).html()
      var newHtml = html.replace(regExp, '<a data-href="' + link + '">' + text + '</a>')
      var newPre = $('<pre>')
      newPre.html(newHtml)
      $(this).replaceWith(newPre)
    })
  }

  $('pre a').on('click', function(event) {
    event.preventDefault()
    if ($('body').hasClass('control-key-down')) {
      var href = $(this).attr('data-href')
      //$(window).scrollTop($(href).offset().top)
      window.location.hash = $(this).attr('data-href').substr(1)
    }
  })

  $(document).keydown(function(e) {
    if (e.ctrlKey || e.shiftKey) {
      $('body').addClass('control-key-down')
    }
  })
  $(document).keyup(function(e) {
    $('body').removeClass('control-key-down')
  })
})
