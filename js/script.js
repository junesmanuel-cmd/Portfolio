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

// Optional: open section based on URL hash when page loads
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const validSection = document.getElementById(hash);
    if (validSection) showSection(hash);
  }
});
