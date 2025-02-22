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
  setInterval(showSlides, 5000);
});

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
