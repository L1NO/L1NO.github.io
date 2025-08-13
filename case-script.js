// Back to top functionality
window.onscroll = function () {
  const backToTop = document.querySelector(".back-to-top");
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Smooth scroll animation for fade-in elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Dynamic stats counter animation
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes("%");
    const numTarget = parseFloat(target);
    let current = 0;
    const increment = numTarget / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numTarget) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + (isPercentage ? "%" : "");
      }
    }, 40);
  });
}

// Trigger stats animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-grid");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add hover effects to cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Template customization helper
window.UXCaseStudyTemplate = {
  updateContent: function (section, content) {
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.innerHTML = content;
    }
  },

  updateMetadata: function (meta) {
    Object.keys(meta).forEach((key) => {
      const element = document.querySelector(`[data-meta="${key}"]`);
      if (element) {
        element.textContent = meta[key];
      }
    });
  },

  addSection: function (title, content, className = "") {
    const section = document.createElement("section");
    section.className = `section ${className}`;
    section.innerHTML = `
              <div class="container">
                  <h2 class="section-title fade-in">${title}</h2>
                  <div class="fade-in">${content}</div>
              </div>
          `;
    document.querySelector("footer").before(section);

    // Re-observe new fade-in elements
    section.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
  },
};
