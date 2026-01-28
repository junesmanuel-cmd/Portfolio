console.log("Portfolio loaded successfully");

// select all nav buttons and sections
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

// show the first section by default
sections[0].classList.add("active");
navButtons[0].classList.add("active");

// function to switch sections
navButtons.forEach(btn => {
  btn.addEventListener("click", function() {
    const targetId = this.dataset.target;

    // hide all sections
    sections.forEach(sec => sec.classList.remove("active"));

    // show target section
    const targetSection = document.getElementById(targetId);
    targetSection.classList.add("active");

    // update active button style
    navButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    // optional: update URL hash
    history.pushState(null, null, `#${targetId}`);
  });
});
