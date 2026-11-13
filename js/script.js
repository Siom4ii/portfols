// ===== Navbar color + logo change on scroll =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const logo = document.getElementById("navLogo");
  const darkSections = document.querySelectorAll(".dark-section");
  const hamburger = document.getElementById("hamburger");

  let inDark = false;
  darkSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 7 && rect.bottom > window.innerHeight / 7) {
      inDark = true;
    }
  });

  if (inDark) {
    navbar.style.background = "rgba(17, 17, 17, 0.9)";
    navbar.querySelectorAll("a").forEach(a => (a.style.color = "#fff"));
    logo.src = "/src/images/KC logo white.png";
    hamburger?.classList.add("white-bars");
  } else {
    navbar.style.background = "rgba(248, 244, 237, 0.9)";
    navbar.querySelectorAll("a").forEach(a => (a.style.color = "#111"));
    logo.src = "/src/images/KC logo black.png";
    hamburger?.classList.remove("white-bars");
  }
});

// ===== Smooth scroll to top when clicking logo =====
document.getElementById("navLogo")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Hamburger Menu Logic =====
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("menuOverlay");
const closeBtn = document.getElementById("closeMenu");

if (hamburger && sideMenu && overlay) {
  const closeMenu = () => {
    hamburger.classList.remove("active");
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
  };

  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    sideMenu.classList.toggle("active", isActive);
    overlay.classList.toggle("active", isActive);
    hamburger.setAttribute("aria-expanded", isActive);
  });

  overlay.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);
  document.querySelectorAll(".side-link").forEach(link =>
    link.addEventListener("click", closeMenu)
  );
}

// ===== Keep hamburger visible on dark sections =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains("dark-section")) {
      hamburger.classList.add("white-bars");
    } else {
      hamburger.classList.remove("white-bars");
    }
  });
});
document.querySelectorAll(".dark-section").forEach(section => observer.observe(section));

// ===== Scroll Progress Bar =====
const progressBar = document.createElement("div");
progressBar.id = "scrollProgress";
document.body.appendChild(progressBar);
Object.assign(progressBar.style, {
  position: "fixed",
  top: 0,
  left: 0,
  height: "4px",
  background: "#39ff14",
  width: "0%",
  zIndex: 3000,
  transition: "width 0.1s linear"
});
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// ===== Back to Top Button =====
const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(backToTop);
Object.assign(backToTop.style, {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  padding: "10px 15px",
  fontSize: "1.2rem",
  border: "none",
  borderRadius: "8px",
  background: "#ffffffff",
  color: "#000000ff",
  cursor: "pointer",
  opacity: "0",
  transition: "opacity 0.3s",
  zIndex: "2000"
});
window.addEventListener("scroll", () => {
  backToTop.style.opacity = window.scrollY > 400 ? "1" : "0";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Typing Effect for Hero Description =====
const heroText = document.querySelector(".hero p");
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = "";
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 25);
    }
  }
  setTimeout(typeWriter, 800);
}

// ===== Kevin Clark Text Scramble Effect =====
window.addEventListener("load", () => {
  const heroName = document.querySelector(".hero h1");
  if (!heroName) return;

  const finalText = heroName.dataset.scrambleText || "Kevin Clark";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]<>?/\\|";
  let iterations = 0;
  const scrambleDuration = 1500;
  const frameRate = 30;
  const totalFrames = scrambleDuration / frameRate;

  const interval = setInterval(() => {
    heroName.textContent = finalText
      .split("")
      .map((char, i) => {
        if (i < iterations) return finalText[i];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    iterations += finalText.length / totalFrames;

    if (iterations >= finalText.length) {
      clearInterval(interval);
      heroName.textContent = finalText;
    }
  }, frameRate);
});

// ===== Smooth Scroll for All Internal Links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetID);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// ===== Reveal on Scroll =====
const revealElements = document.querySelectorAll(".service, .project, .skill-block, .works-left, .works-right");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealElements.forEach(el => revealObserver.observe(el));

// ===== Parallax Effect for Hero Section =====
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPositionY = `${offset}px`;
  }
});

// ===== Floating Particles Background =====
const canvas = document.createElement("canvas");
canvas.id = "particleCanvas";
document.body.prepend(canvas);
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
