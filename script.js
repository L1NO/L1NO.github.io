// Global UI Scripts

// Share Popup Dialog
function openPop() {
  const dialog = document.getElementById('popupDialog');
  if (!dialog) return;
  if (dialog.style.display === 'none' || dialog.style.display === '') {
    dialog.style.display = 'flex';
  } else {
    dialog.style.display = 'none';
  }
}

// Toast Message Notification
function showToast(message = "Link copied to clipboard!") {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Copy Article URL
function copyArticleLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast("Article link copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy link.");
  });
}

// Reading Progress Bar (for Article Pages)
window.addEventListener('scroll', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }
});

// Auto calculate reading time and sync metadata for article pages (Scheme A)
function initArticlePage() {
  const bodyEl = document.querySelector('.article-body');
  if (!bodyEl) return;

  // 1. Calculate reading time dynamically (< 0.1ms execution time, zero page lag)
  const text = bodyEl.innerText || '';
  const englishWords = (text.match(/[a-zA-Z0-9_-]+/g) || []).length;
  const cjkChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalCount = englishWords + cjkChars;
  const readTimeMinutes = Math.max(1, Math.ceil(totalCount / 220));
  const readTimeString = `${readTimeMinutes} min read`;

  // 2. Auto-sync metadata from articles-data.js if available
  let matchedArticle = null;
  if (typeof articlesData !== 'undefined' && Array.isArray(articlesData)) {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const currentFile = currentPath.split('/').pop().toLowerCase();

    if (currentFile && currentFile !== 'article-template.html') {
      matchedArticle = articlesData.find(item => {
        if (!item.slug) return false;
        const itemFile = item.slug.split('/').pop().toLowerCase();
        return itemFile === currentFile;
      });
    }
  }

  if (matchedArticle) {
    // Title
    const titleEl = document.querySelector('.article-main-title');
    if (titleEl) {
      titleEl.textContent = matchedArticle.title;
      document.title = `${matchedArticle.title} | Ossian Lin`;
    }

    // Subtitle / Summary
    const subtitleEl = document.querySelector('.article-main-subtitle');
    if (subtitleEl) {
      subtitleEl.textContent = matchedArticle.summary;
    }

    // Meta Description for SEO
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && matchedArticle.summary) {
      metaDesc.setAttribute('content', matchedArticle.summary);
    }

    // Tag / Category
    const tagEl = document.querySelector('.article-tag');
    if (tagEl) {
      tagEl.textContent = matchedArticle.category;
    }

    // Publish Details (Date & Dynamic Reading Time)
    const detailsEl = document.querySelector('.article-publish-details');
    if (detailsEl) {
      detailsEl.textContent = `Published on ${matchedArticle.date} · ${readTimeString}`;
    }
  } else {
    // Fallback: If not found in articles-data.js, just attach the calculated reading time
    const detailsEl = document.querySelector('.article-publish-details');
    if (detailsEl) {
      const rawText = detailsEl.textContent.trim();
      const dateMatch = rawText.match(/Published on\s+([^\s·•]+(?:\s+\d+)?(?:,\s*\d+)?)/i);
      const dateText = dateMatch ? dateMatch[1] : 'Aug 2025';
      detailsEl.textContent = `Published on ${dateText} · ${readTimeString}`;
    }
  }
}

// ==========================================================================
// Centralized Dynamic Footer Controller (Auto-syncs Links & Copyright Year)
// ==========================================================================
function initGlobalFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const scriptEl = document.querySelector('script[src*="script.js"]');
  const scriptSrc = scriptEl ? scriptEl.getAttribute('src') : '';
  const prefix = scriptSrc && scriptSrc.includes('../') ? '../' : '';

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <ul class="footer-links">
      <li><a href="${prefix}index.html" class="footer-link">Home</a></li>
      <li><a href="${prefix}projects.html" class="footer-link">Projects</a></li>
      <li><a href="${prefix}articles.html" class="footer-link">Writing</a></li>
      <li>
        <a href="mailto:ossianlin@gmail.com" class="footer-link">Contact</a>
      </li>
    </ul>
    <p>&copy; Ossian Lin ${currentYear}. All rights reserved.</p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initGlobalFooter();
  initArticlePage();
  initProjectPage();
  initProjectsSlider();
});

// ==========================================================================
// Projects Section Carousel Controller (Single Card + Flanking Controls)
// ==========================================================================
function initProjectsSlider() {
  const viewport = document.getElementById('carouselViewport');
  const track = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('projectPrevBtn');
  const nextBtn = document.getElementById('projectNextBtn');

  if (!viewport || !track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.project-slide');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Flanking Arrow Button Listeners
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  // Keyboard Navigation (Left / Right Arrows when viewport is focused)
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });

  // Mobile Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchStartY = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Trigger only if horizontal swipe exceeds 40px and is greater than vertical motion
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goToSlide(currentIndex + 1); // Swiped left -> Next
      } else {
        goToSlide(currentIndex - 1); // Swiped right -> Prev
      }
    }
  }, { passive: true });

  // Initialize
  goToSlide(0);
}

// ==========================================================================
// Project / UX Case Study Interactive Functionality
// ==========================================================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function initProjectPage() {
  const backToTopBtn = document.querySelector('.back-to-top');

  // Floating button visibility
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // IntersectionObserver for Fade-in Elements & Cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .case-card, .stat-card, .persona-card, .timeline-step, .hmw-card').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Dynamic Stats Number Counter Animation
  function animateStatElement(statElem) {
    const originalText = statElem.textContent.trim();
    const match = originalText.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? match[2].split('.')[1].length : 0;

    const duration = 1200; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetNum * easeOut;

      if (isDecimal) {
        statElem.textContent = `${prefix}${currentVal.toFixed(decimalPlaces)}${suffix}`;
      } else {
        statElem.textContent = `${prefix}${Math.round(currentVal)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        statElem.textContent = originalText;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const statsSection = document.querySelector('.stats-grid, .stats-group');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-number').forEach(stat => {
            animateStatElement(stat);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }
}
