$(function () {
  $('.toggle-menu').on('click', function () {
    if (!$('.menus').is(':visible')) {
      $('.menus').velocity('stop')
        .velocity('transition.slideDownIn', { duration: 300 })
    } else {
      $('.menus').velocity('stop')
        .velocity('transition.slideUpOut', { duration: 300 })
    }
  })
  $(document).on('click touchstart', function (e) {
    var flag = $('.menus')[0].contains(e.target) || $('.toggle-menu')[0].contains(e.target)
    if (!flag && $('.toggle-menu').is(':visible')) {
      $('.menus').velocity('stop')
        .velocity('transition.slideUpOut', { duration: 300 })
    }
  })
  $(window).on('resize', function (e) {
    if (!$('.toggle-menu').is(':visible')) {
      if (!$('.menus').is(':visible')) {
        $('.menus').velocity('stop')
          .velocity('transition.slideDownIn', { duration: 300 })
      }
    }
  })
  // 新浪图床
  var link = "";
  // 遍历所有的img标签
  $("img").each((i, o) => {
    var o = $(o);
    // 判断图片的链接是否包含sinaimg关键字
    if (o.attr("src").indexOf("sinaimg") > 0) {
      // 给这个标签加上referrerPlicy属性
      o.attr("referrerpolicy", "no-referrer");
      // 备份图片的src
      link = o.attr("src");
      // 重新设置src，让页面重新加载一次图片
      o.attr("src", link);
    }
  });
})
