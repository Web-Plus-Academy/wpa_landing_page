const heroSection = document.querySelector('.hero-section');

const images = [
  '../images/slider/1.png',
  '../images/slider/2.png',
  '../images/slider/3.png',
  '../images/slider/4.png',
  '../images/slider/5.png',
  '../images/slider/6.png',
];

const mobileImages = [
  '../images/slider/m1.png',
  '../images/slider/m2.png',
  '../images/slider/m3.png',
  '../images/slider/m4.png'
];

let index = 0;

// Function to detect if the screen is a phone screen
function isPhoneScreen() {
  return window.matchMedia('(max-width: 768px)').matches;
}

// Function to change the background image
function changeBackground() {
  const imageList = isPhoneScreen() ? mobileImages : images; // Use mobile images for phone screens
  const nextImage = imageList[index];
  heroSection.style.backgroundImage = `url('${nextImage}')`;

  index = (index + 1) % imageList.length; // Update index
}

// Change the background every 2 seconds
setInterval(changeBackground, 2000);

// Re-check on window resize to adapt to screen changes
window.addEventListener('resize', () => {
  index = 0; // Reset the index to start from the first image when screen size changes
  changeBackground();
});
