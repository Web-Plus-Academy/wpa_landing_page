
/*slider*/
let slideIndex = 0; // Start from the first slide
let slideTimeout;

showSlides();

// Next/previous controls
function plusSlides(n) {
  clearTimeout(slideTimeout);
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(slideTimeout);
  showSlides(slideIndex = n - 1); // Subtract 1 to match array index
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (slideIndex >= slides.length) { slideIndex = 0 } // Reset to the first slide if it reaches the end
  if (slideIndex < 0) { slideIndex = slides.length - 1 } // Set to the last slide if it goes before the first
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";
  
  // Call showSlides again after 5 seconds
  slideTimeout = setTimeout(function() {
    showSlides(slideIndex += 1);
  }, 3000);
}