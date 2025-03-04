document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  let slides = document.getElementsByClassName("slide");

  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    
    slides[slideIndex].style.display = "block";
  }

  showSlides();
  setInterval(showSlides, 5000);

});

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}




$(document).ready(function() {
  $('.slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }
    ]
    
  });
});

$( "#contact-form" ).validate({
            
});  