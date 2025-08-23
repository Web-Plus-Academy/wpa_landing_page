const textElement = document.getElementById("animated-text");

const texts = [
  " #SWPA the Open source ",
  " Peer-to-Peer Training ",
  " Entrepreneurship Program ",
  " All-Domain Skill Programs ",
  " Student-led Innovation ",
  " Affordable Education "
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    // Deleting characters
    textElement.textContent = currentText.substring(0, charIndex--);
  } else {
    // Typing characters
    textElement.textContent = currentText.substring(0, charIndex++);
  }

  // Adjust typing speed
  let typingSpeed = isDeleting ? 100 : 200;

  if (!isDeleting && charIndex === currentText.length) {
    // Pause before deleting
    isDeleting = true;
    typingSpeed = 1000;
  } else if (isDeleting && charIndex === 0) {
    // Move to next text
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500;
  }

  setTimeout(typeAnimation, typingSpeed);
}

// Start the animation
typeAnimation();
