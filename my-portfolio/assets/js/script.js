document.addEventListener("DOMContentLoaded", () => {
  const roles = ["Web Designer", "Web Developer", "Graphic Designer"];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const textElement = document.getElementById("text");

  function typeEffect() {
    const currentRole = roles[currentIndex];
    
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1000); // pause before deleting
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }

  typeEffect(); // Start the typing effect
});