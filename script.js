const themeButtons = document.querySelectorAll('.theme-button');

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-theme');
    document.body.className = theme; 
  });
});


const menuIcon = document.querySelector('.menu-icon');
const dropdown = document.querySelector('.dropdown');

menuIcon.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});


document.addEventListener('click', (event) => {
  if (!menuIcon.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});


let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function goToSlide(slideIndex) {
  if (slideIndex < 0) {
    slideIndex = totalSlides - 1; 
  } else if (slideIndex >= totalSlides) {
    slideIndex = 0; 
  }
  currentSlide = slideIndex;
  const offset = -currentSlide * 100; 
  slides.style.transform = `translateX(${offset}%)`; 
  updateDots(); 
}

document.querySelector('.prev').addEventListener('click', () => {
  goToSlide(currentSlide - 1); 
});

document.querySelector('.next').addEventListener('click', () => {
  goToSlide(currentSlide + 1); 
});

const dotsContainer = document.querySelector('.dots');

if (dotsContainer) {
  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  
  updateDots();
}

let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 3000); 
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

startAutoplay();

const slideshow = document.querySelector('.slideshow');
if (slideshow) {
  slideshow.addEventListener('mouseenter', stopAutoplay);
  slideshow.addEventListener('mouseleave', startAutoplay);
}