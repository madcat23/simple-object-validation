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

$(window).on('scroll', function() {
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

    if (headlineOffsetToViewport <= 0) {
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
})