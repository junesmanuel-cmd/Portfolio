console.log("Portfolio loaded successfully");

// ===============================
// Keyboard shortcut for menu toggle (ESC)
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    const menuItems = document.getElementById("menu-items");
    if (menuItems) {
      menuItems.classList.toggle("show");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Menu toggle (desktop + mobile)
  // ===============================
  const menuBtn = document.getElementById("menu-btn");
  const menuItems = document.getElementById("menu-items");
  menuItems.classList.remove("show"); // hidden by default

  menuBtn.addEventListener("click", () => {
    menuItems.classList.toggle("show");
  });

  // ===============================
  // Sections navigation
  // ===============================
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  // Scroll reveal for sections
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(30px) scale(0.98)";
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0) scale(1)";
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));

  // Default active section
  sections.forEach(sec => sec.classList.remove("active"));
  sections[0].classList.add("active");
  navButtons[0].classList.add("active");

  // Show section function (updated for animation on switch)
  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.remove("active");
      // reset for animation
      sec.style.opacity = 0;
      sec.style.transform = "translateY(30px) scale(0.98)";
    });

    navButtons.forEach(btn => btn.classList.remove("active"));

    const target = document.getElementById(id);
    target.classList.add("active");

    // trigger animation after reflow
    requestAnimationFrame(() => {
      target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      target.style.opacity = 1;
      target.style.transform = "translateY(0) scale(1)";
    });

    document.querySelector(`.nav-btn[data-target="${id}"]`).classList.add("active");
    history.pushState(null, null, `#${id}`);
    menuItems.classList.remove("show"); // close menu on mobile
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      showSection(btn.dataset.target);
    });
  });

  // ===============================
  // Photo slider
  // ===============================
  document.querySelectorAll(".photo-slider").forEach(slider => {
    const slides = slider.querySelectorAll(".slide");
    let current = 0;

    function showSlide(i) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[i].classList.add("active");
    }

    showSlide(current);

    const prevBtn = slider.querySelector(".slide-btn.prev");
    const nextBtn = slider.querySelector(".slide-btn.next");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });
      nextBtn.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });
    }

    // Touch swipe support
    let startX = 0, endX = 0;
    slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    slider.addEventListener("touchmove", e => endX = e.touches[0].clientX);
    slider.addEventListener("touchend", () => {
      if (startX - endX > 50) current = (current + 1) % slides.length;
      else if (endX - startX > 50) current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    // Autoplay every 5 seconds
    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  });

  // ===============================
  // Photo grid hover + scroll reveal (fixed)
  // ===============================
  document.querySelectorAll(".photo-grid img").forEach(img => {
    img.style.opacity = 0;
    img.style.transform = "translateY(30px) scale(0.95)";

    const imgObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          img.style.opacity = 1;
          img.dataset.baseTransform = "translateY(0) scale(1)"; // store base transform
          img.style.transform = img.dataset.baseTransform;
        }
      });
    }, { threshold: 0.1 });

    imgObs.observe(img);

    img.addEventListener("mouseenter", () => {
      img.style.transform = "translateY(0) scale(1.08) rotate(-1deg)";
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = img.dataset.baseTransform + " rotate(0deg)";
    });
  });
});
