document.addEventListener('DOMContentLoaded', function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
    // Hide all slides first
    slides.forEach(slide => slide.style.display = "none");
    
    // Increment slideIndex, loop back to 0 if it exceeds the length
    slideIndex = (slideIndex + 1) % slides.length;

    // Display the current slide
    slides[slideIndex].style.display = "block";
  }

  // Initially display the first slide
  showSlides();

  // Set interval to change slides every 3 seconds (3000 ms)
  setInterval(showSlides, 6000);
});

$(document).ready(function() {
  $('.slider').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  arrows: false,
                  dots: true,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 2
              }
          },
          {
              breakpoint: 480,
              settings: {
                  arrows: false,
                  dots: true,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 1
              }
          }
      ]
  });
});
