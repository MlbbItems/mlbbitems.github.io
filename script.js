// Ripple Effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (this.classList.contains('toggle-btn')) return;

    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = e.clientX - e.target.offsetLeft + "px";
    ripple.style.top = e.clientY - e.target.offsetTop + "px";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Dark Mode with Persistence
const toggleBtn = document.querySelector('.toggle-btn');

// Function to apply theme
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️ Toggle Light Mode";
  } else {
    document.body.classList.remove("dark");
    if (toggleBtn) toggleBtn.textContent = "🌙 Toggle Dark Mode";
  }
}

// Load saved theme on page load
let savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Toggle theme on click
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    let newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
}
