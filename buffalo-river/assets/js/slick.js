$(window).on('load', function() {
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        asNavFor: '.slider-nav'
      });
      
  
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider',
      arrows: true,
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });
  });
  
  $(document).ready(function() {

    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'div',
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000
    });


});