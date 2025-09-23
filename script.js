// Ripple Effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Prevent double-ripple if toggle button is clicked
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

// Dark Mode Toggle
const toggleBtn = document.querySelector('.toggle-btn');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') 
      ? "☀️ Toggle Light Mode" 
      : "🌙 Toggle Dark Mode";
  });
}
