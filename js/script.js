console.log("Portfolio loaded successfully");

// Menu toggle for mobile
const menuBtn = document.getElementById("menu-btn");
const menuItems = document.getElementById("menu-items");

menuBtn.addEventListener("click", () => {
  menuItems.classList.toggle("show"); // toggle menu visibility
});

// Section switching
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

// Show first section by default
sections.forEach(sec => sec.classList.remove("active"));
sections[0].classList.add("active");
navButtons.forEach(btn => btn.classList.remove("active"));
navButtons[0].classList.add("active");

// Function to switch section
function showSection(targetId) {
  sections.forEach(sec => sec.classList.remove("active"));
  navButtons.forEach(btn => btn.classList.remove("active"));

  const targetSection = document.getElementById(targetId);
  const targetButton = document.querySelector(`.nav-btn[data-target="${targetId}"]`);

  if (targetSection) targetSection.classList.add("active");
  if (targetButton) targetButton.classList.add("active");

  // Update URL hash
  history.pushState(null, null, `#${targetId}`);

  // Close mobile menu
  menuItems.classList.remove("show");
}

// Add click events to all nav buttons
navButtons.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.dataset.target;
    showSection(targetId);
  });
});


//slider functionality for photo galleries and button for desktop
document.querySelectorAll('.photo-slider').forEach(slider => {
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slide-btn.prev');
  const nextBtn = slider.querySelector('.slide-btn.next');

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  // Desktop button clicks
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Mobile swipe
  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    if (startX - endX > 50) { // swipe left
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (endX - startX > 50) { // swipe right
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  });
});


