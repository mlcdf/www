$(document).ready(function() {

  /*CARDS CONTENT*/
  $(".computing .card-title").click(function() {
    $(".computing .card-title, .computing .card-content").toggleClass("closed");
    $(".computing .open").toggleClass("none");
    $(".computing .close").toggleClass("display");
  });
  $(".web-design .card-title").click(function() {
    $(".web-design .card-title, .web-design .card-content").toggleClass("closed");
    $(".web-design .open").toggleClass("none");
    $(".web-design .close").toggleClass("display");
  });
  $(".programming .card-title").click(function() {
    $(".programming .card-title, .programming .card-content ").toggleClass("closed ");
    $(".programming .open").toggleClass("none");
    $(".programming .close").toggleClass("display");
  });
  $(".high-tech .card-title").click(function() {
    $(".high-tech .card-title, .high-tech .card-content").toggleClass("closed");
    $(".high-tech .open").toggleClass("none");
    $(".high-tech .close").toggleClass("display");
  });
  $(".entertainment .card-title").click(function() {
    $(".entertainment .card-title, .entertainment .card-content").toggleClass("closed");
    $(".entertainment .open").toggleClass("none");
    $(".entertainment .close").toggleClass("display");
  });
  $(".listening .card-title").click(function() {
    $(".listening .card-title, .listening .card-content").toggleClass("closed");
    $(".listening .open").toggleClass("none");
    $(".listening .close").toggleClass("display");
  });

  /*SCROLL TO THE TOP*/
  $('#to-about, #more').click(function() {
    $('html,body').animate({
      scrollTop: $('.intro').offset().top + 1
    }, 'normal');
  });
  $('#to-skills').click(function() {
    $('html,body').animate({
      scrollTop: $('.skills').offset().top + 1
    }, 'normal');
  });
  $('#to-contact').click(function() {
    $('html,body').animate({
      scrollTop: $('.contact').offset().top + 1
    }, 'normal');
  });

  $('#logo').click(function() {
    $('html,body').animate({
      scrollTop: 0
    }, 'normal');
  });


  /* FIX RESIZE HEADER ON MOBILE*/
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    var header = $("header");
    $(window).resize("resizeBackground");

    function resizeBackground() {
      header.height($(window).height() * 94 / 100);
    }
    resizeBackground();
  }


});
