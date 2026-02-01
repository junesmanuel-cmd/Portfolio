console.log("Portfolio loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
	
	
  // ===============================
  // Main DOM Elements
  // ===============================
  const menuBtn = document.getElementById("menu-btn");
  const menuItems = document.getElementById("menu-items");
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");
  // ===============================
  // Helpers
  // ===============================
  const isMobile = () => window.innerWidth <= 768;

  // ===============================
  // Menu State
  // ===============================
  let menuState = { mobileOpen: false };

  // ===============================
  // Mobile Menu Methods
  // ===============================
  const mobileMenu = {
    open() {
      menuState.mobileOpen = true;
      menuItems.classList.add("show");
    },
    close() {
      menuState.mobileOpen = false;
      menuItems.classList.remove("show");
    },
    toggle() {
      menuState.mobileOpen ? this.close() : this.open();
    }
  };

  // ===============================
  // Desktop Menu Methods
  // ===============================
  const desktopMenu = {
    show() {
      menuItems.classList.remove("hide");
      menuItems.style.opacity = 1;
      menuItems.style.pointerEvents = "auto";
      menuItems.style.display = "flex";
      menuItems.style.transform = "translateX(-50%)"; // reset mobile transform
    },
    hide() {
      menuItems.classList.add("hide");
      menuItems.style.opacity = 0;
      menuItems.style.pointerEvents = "none";
      menuItems.style.display = "none";
    }
  };
  // ===============================
  // Initialize Menu Display
  // ===============================
  function initializeMenu() {
    if (isMobile()) {
      menuItems.style.display = "block";
      menuItems.style.transform = ""; // reset desktop transform
      mobileMenu.close();
    } else {
      desktopMenu.show();
    }
  }

  initializeMenu();

  // ===============================
  // Menu Toggle Click
  // ===============================
  menuBtn.addEventListener("click", () => {
    if (isMobile()) mobileMenu.toggle();
    else desktopMenu.show();
  });

  // ===============================
  // Window Resize Handling
  // ===============================
  window.addEventListener("resize", initializeMenu);


  // ===============================
  // Section Navigation
  // ===============================
  function showSection(id, closeMobile = true) {
    // Hide all sections and remove active class from nav buttons
    sections.forEach(sec => {
      sec.classList.remove("active");
      sec.style.opacity = 0;
      sec.style.transform = "translateY(30px) scale(0.98)";
    });
    navButtons.forEach(btn => btn.classList.remove("active"));

    // Show target section
    const target = document.getElementById(id);
    if (!target) return;

    target.classList.add("active");
    requestAnimationFrame(() => {
      target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      target.style.opacity = 1;
      target.style.transform = "translateY(0) scale(1)";
    });

    // Highlight corresponding nav button
    const navBtn = document.querySelector(`.nav-btn[data-target="${id}"]`);
    if (navBtn) navBtn.classList.add("active");

    // Close mobile menu if needed
    if (isMobile() && closeMobile) mobileMenu.close();

    // Update URL hash without scrolling
    history.replaceState(null, null, `#${id}`);
  }

  // Add click listeners to nav buttons
  navButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      showSection(btn.dataset.target, true);
    });
  });

  // Activate section based on URL hash or default to first section
  function activateSectionFromHashOrDefault() {
    const hash = window.location.hash.substring(1);
    const target = document.getElementById(hash);
    if (target && target.classList.contains("section")) showSection(hash, false);
    else showSection(sections[0].id, false);
  }

  activateSectionFromHashOrDefault();
  window.addEventListener("hashchange", activateSectionFromHashOrDefault);

  // ===============================
  // Section Text Animations
  // ===============================
  function setupSectionTextAnimations() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    function animateSectionText(section) {
      const items = [
        ...section.querySelectorAll(
          'p, li, h1, h2, h3, h4, h5, h6, strong, span, .update-intro p, .update-intro ul li, .update-improvements .title, .update-improvements .description'
        )
      ];

      items.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
      });

      items.forEach((item, idx) => {
        setTimeout(() => {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
        }, idx * 50);
      });
    }

    const initialSection = document.querySelector('.section.active');
    if (initialSection) animateSectionText(initialSection);

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        sections.forEach(sec => sec.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        targetSection.classList.add('active');
        animateSectionText(targetSection);
      });
    });
  }

  setupSectionTextAnimations();

  // ===============================
  // Photo Sliders with bump animation
  // ===============================
  document.querySelectorAll(".photo-slider").forEach(slider => {
    const slides = slider.querySelectorAll(".slide");
    const badge = slider.querySelector(".badge");
    let current = 0, autoSlide;

    // Initialize slides
    slides.forEach(slide => {
      slide.style.position = "absolute";
      slide.style.top = 0;
      slide.style.left = 0;
      slide.style.width = "100%";
      slide.style.transition = "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.6s ease";
      slide.style.opacity = 0;
      slide.style.transform = "translateX(100%) scale(0.98)";
      slide.style.zIndex = 0;
    });

    function showSlide(i, direction = 1) {
      if (i === current) return; // do nothing if same slide

      const prevSlide = slides[current];
      const nextSlide = slides[i];

      // Slide out previous
      prevSlide.style.transform = `translateX(${-100 * direction}%) scale(0.98)`;
      prevSlide.style.opacity = 0;
      prevSlide.style.zIndex = 0;

      // Prepare next slide
      nextSlide.style.transform = `translateX(${100 * direction}%) scale(0.98)`;
      nextSlide.style.opacity = 1;
      nextSlide.style.zIndex = 1;

      // Slide in + bump
      requestAnimationFrame(() => {
        nextSlide.style.transform = "translateX(0) scale(1.05)";
        setTimeout(() => {
          nextSlide.style.transform = "translateX(0) scale(1)";
        }, 300);
      });

      current = i;

      if (badge) badge.textContent = `${i + 1} / ${slides.length}`;
    }

    function nextSlideFunc() { showSlide((current + 1) % slides.length, 1); }
    function prevSlideFunc() { showSlide((current - 1 + slides.length) % slides.length, -1); }

    // Show first slide
    slides[current].style.transform = "translateX(0) scale(1)";
    slides[current].style.opacity = 1;
    slides[current].style.zIndex = 1;
    if (badge) badge.textContent = `1 / ${slides.length}`;

    // Buttons
    const prevBtn = slider.querySelector(".slide-btn.prev");
    const nextBtn = slider.querySelector(".slide-btn.next");
    if (prevBtn) prevBtn.addEventListener("click", () => { prevSlideFunc(); resetAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { nextSlideFunc(); resetAutoSlide(); });

    // Touch support
    let startX = 0, endX = 0;
    slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    slider.addEventListener("touchmove", e => endX = e.touches[0].clientX);
    slider.addEventListener("touchend", () => {
      if (startX - endX > 50) nextSlideFunc(), resetAutoSlide();
      else if (endX - startX > 50) prevSlideFunc(), resetAutoSlide();
    });

    // Auto-slide
    function startAutoSlide() { autoSlide = setInterval(nextSlideFunc, 5000); }
    function resetAutoSlide() { clearInterval(autoSlide); startAutoSlide(); }
    startAutoSlide();

    // ===============================
    // Image Hover Bump inside slides
    // ===============================
    slider.querySelectorAll("img").forEach(img => {
      img.style.transition = "transform 0.4s ease, opacity 0.6s ease";
      img.dataset.baseTransform = "translateY(0) scale(1)";

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.style.opacity = 1;
            img.style.transform = img.dataset.baseTransform;
            observer.unobserve(img);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(img);

      img.addEventListener("mouseenter", () => { img.style.transform = "translateY(0) scale(1.05)"; });
      img.addEventListener("mouseleave", () => { img.style.transform = img.dataset.baseTransform; });
    });
  });

  // ===============================
  // Feedback Form
  // ===============================
  function setupFeedbackForm() {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackPopup = document.getElementById("feedback-popup");
    const feedbackPopupMessage = document.getElementById("feedback-popup-message");
    const feedbackPopupClose = document.getElementById("feedback-popup-close");

    if (!feedbackForm) return;

    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(feedbackForm);
      try {
        const response = await fetch(feedbackForm.action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          feedbackPopupMessage.innerHTML = `<strong style="color: var(--accent); font-size: 1.4rem;">🎉 Thank You for Your Feedback!</strong><br><br>
          <span style="color: #ccc;">Hi there! I’m <strong style="color: var(--accent-hover);">Junes Manuel M. Rafal</strong>, the developer of this system. I sincerely appreciate you taking the time to explore it and share your thoughts. Every piece of feedback helps me improve and shape this system for a better experience.</span><br><br>
          <span style="color: var(--white1);">This system was carefully built with focus on <strong style="color: var(--accent-hover);">usability</strong>, <strong style="color: var(--accent-hover);">performance</strong>, and <strong style="color: var(--accent-hover);">smooth, thoughtful interactions</strong>. I designed each feature to make your experience seamless, enjoyable, and meaningful.</span><br><br>
          <span style="color: #ccc;">Your suggestions, comments, or kind words truly matter. They guide me in refining the system and planning future updates. Everything you share is read personally and considered with care.</span><br><br>
          <em style="color: #999;">With sincere gratitude,</em><br>
          <strong style="color: var(--accent);">Junes Manuel M. Rafal</strong><br>
          <span style="color: #aaa;">Student & Developer — building tools with care, one feature at a time.</span>`;
          feedbackPopup.classList.add("show");
          feedbackForm.reset();
        } else {
          feedbackPopupMessage.textContent = "Oops! Something went wrong. Please try again later.";
          feedbackPopup.classList.add("show");
        }
      } catch (error) {
        feedbackPopupMessage.textContent = "Network error. Please check your connection.";
        feedbackPopup.classList.add("show");
      }
    });

    if (feedbackPopupClose) {
      feedbackPopupClose.addEventListener("click", () => { feedbackPopup.classList.remove("show"); });
    }
  }
  

  setupFeedbackForm();
});


