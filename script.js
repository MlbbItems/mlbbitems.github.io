// Ripple Effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Skip ripple for toggle button
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

// Dark Mode Toggle with LocalStorage
const toggleBtn = document.querySelector('.toggle-btn');

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (toggleBtn) toggleBtn.textContent = "☀️ Toggle Light Mode";
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Save preference
    if (document.body.classList.contains('dark')) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️ Toggle Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙 Toggle Dark Mode";
    }
  });
}
