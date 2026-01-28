console.log("Portfolio loaded successfully");

// Toggle menu buttons when menu image clicked
const menuBtn = document.getElementById("menu-btn");
const menuItems = document.getElementById("menu-items");

menuBtn.addEventListener("click", () => {
  menuItems.classList.toggle("show"); // toggles hidden/visible
});

// Section switching logic
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

// Show first section by default
sections[0].classList.add("active");
navButtons[0].classList.add("active");

// Switch sections on nav button click
navButtons.forEach(btn => {
  btn.addEventListener("click", function() {
    const targetId = this.dataset.target;

    // Hide all sections
    sections.forEach(sec => sec.classList.remove("active"));

    // Show target section
    document.getElementById(targetId).classList.add("active");

    // Update active button style
    navButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    // Optional: update URL hash
    history.pushState(null, null, `#${targetId}`);

    // Hide menu items after clicking
    menuItems.classList.remove("show");
  });
});
