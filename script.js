const owner = "MlbbItems";
const repo = "mlbbitems"; // change if needed

async function loadLatestRelease() {
  const btn = document.getElementById("github-download");

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
    const data = await res.json();

    if (data.assets && data.assets.length > 0) {
      const apk = data.assets.find(a => a.name.endsWith(".apk"));
      btn.href = apk ? apk.browser_download_url : data.assets[0].browser_download_url;
    } else {
      btn.href = data.html_url;
    }

    btn.textContent = `⬇ Download ${data.tag_name}`;
  } catch (err) {
    console.error(err);
    btn.textContent = "⚠ Failed to load download";
  }
}

loadLatestRelease();

// ===== Cookie Helpers =====
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// ===== Ripple Effect =====
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

// ===== Dark Mode with Cookies =====
const toggleBtn = document.querySelector('.toggle-btn');

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️ Toggle Light Mode";
  } else {
    document.body.classList.remove("dark");
    if (toggleBtn) toggleBtn.textContent = "🌙 Toggle Dark Mode";
  }
}

// Load theme from cookie (default = light)
let savedTheme = getCookie("theme") || "light";
applyTheme(savedTheme);

// Toggle theme on button click
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    let newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    setCookie("theme", newTheme, 365); // save for 1 year
    applyTheme(newTheme);
  });
}
