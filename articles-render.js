// Data-Driven Article Renderer for index.html & articles.html

function createArticleCardHTML(article) {
  const isExt = Boolean(article.isExternal);
  const targetAttr = isExt ? 'target="_blank" rel="noopener noreferrer"' : '';
  const actionText = isExt ? 'Read on Medium' : 'Read article';
  const arrow = isExt ? '↗' : '→';
  const readTimeMeta = article.readTime ? `<span>•</span><span>${article.readTime}</span>` : '';

  return `
    <a href="${article.slug}" class="article-card" ${targetAttr} data-category="${article.category}">
      <div class="article-card-header">
        <span class="article-tag">${article.category}</span>
        <div class="article-date-meta">
          <span>${article.date}</span>
          ${readTimeMeta}
        </div>
      </div>
      <h3 class="article-card-title">${article.title}</h3>
      <p class="article-card-summary">${article.summary}</p>
      <div class="article-card-footer">
        <span>${actionText}</span>
        <span class="read-arrow">${arrow}</span>
      </div>
    </a>
  `;
}

// 1. Homepage Latest 3 Articles Renderer
function renderHomeArticles() {
  const container = document.getElementById('homeArticlesGrid');
  if (!container || typeof articlesData === 'undefined') return;

  const latestArticles = articlesData.slice(0, 3);
  container.innerHTML = latestArticles.map(createArticleCardHTML).join('');

  const viewAllBtn = document.getElementById('viewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.innerHTML = `<span>View All Articles (${articlesData.length})</span> <span>→</span>`;
  }
}

// 2. Articles Archive Page (Filter, Search & Pagination)
let currentCategory = 'all';
let searchKeyword = '';
let currentPage = 1;
const itemsPerPage = 9; // 9 articles per page for a balanced 3x3 grid

function renderCategoryFilters() {
  const filterContainer = document.getElementById('filterContainer');
  if (!filterContainer || typeof articlesData === 'undefined') return;

  // Extract unique categories and their counts
  const categoryCounts = {};
  articlesData.forEach((art) => {
    categoryCounts[art.category] = (categoryCounts[art.category] || 0) + 1;
  });

  let buttonsHTML = `
    <button class="filter-btn ${currentCategory === 'all' ? 'active' : ''}" onclick="setCategory('all')">
      All (${articlesData.length})
    </button>
  `;

  Object.keys(categoryCounts).forEach((cat) => {
    const isActive = currentCategory === cat ? 'active' : '';
    buttonsHTML += `
      <button class="filter-btn ${isActive}" onclick="setCategory('${cat}')">
        ${cat} (${categoryCounts[cat]})
      </button>
    `;
  });

  filterContainer.innerHTML = buttonsHTML;
}

function getFilteredArticles() {
  if (typeof articlesData === 'undefined') return [];

  return articlesData.filter((article) => {
    // Category filter
    const matchCategory = currentCategory === 'all' || article.category === currentCategory;

    // Search keyword filter
    let matchKeyword = true;
    if (searchKeyword.trim() !== '') {
      const q = searchKeyword.toLowerCase();
      const matchTitle = article.title ? article.title.toLowerCase().includes(q) : false;
      const matchSummary = article.summary ? article.summary.toLowerCase().includes(q) : false;
      const matchCategoryText = article.category ? article.category.toLowerCase().includes(q) : false;
      matchKeyword = matchTitle || matchSummary || matchCategoryText;
    }

    return matchCategory && matchKeyword;
  });
}

function renderArticlesArchive() {
  const listContainer = document.getElementById('articlesList');
  const paginationContainer = document.getElementById('paginationContainer');
  if (!listContainer || typeof articlesData === 'undefined') return;

  const filtered = getFilteredArticles();
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;

  if (currentPage > totalPages) {
    currentPage = 1;
  }

  // Slice articles for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageArticles = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (pageArticles.length === 0) {
    listContainer.innerHTML = `<div class="no-results">No articles found matching your criteria.</div>`;
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  listContainer.innerHTML = pageArticles.map(createArticleCardHTML).join('');

  // Render smart pagination with windowing
  if (paginationContainer) {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let paginationHTML = `
      <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous Page">
        ←
      </button>
    `;

    // Smart pagination window
    const pagesToShow = new Set([1, totalPages]);
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pagesToShow.add(i);
    }
    const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);

    let lastPage = 0;
    for (const pageNum of sortedPages) {
      if (lastPage && pageNum - lastPage > 1) {
        paginationHTML += `<span style="padding: 0.25rem 0.5rem; opacity: 0.5;">...</span>`;
      }
      paginationHTML += `
        <button class="page-btn ${pageNum === currentPage ? 'active' : ''}" onclick="changePage(${pageNum})">
          ${pageNum}
        </button>
      `;
      lastPage = pageNum;
    }

    paginationHTML += `
      <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next Page">
        →
      </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
  }
}

function setCategory(cat) {
  currentCategory = cat;
  currentPage = 1;
  renderCategoryFilters();
  renderArticlesArchive();
}

function handleSearchInput(e) {
  searchKeyword = e.target.value;
  currentPage = 1;
  renderArticlesArchive();
}

function changePage(page) {
  const filtered = getFilteredArticles();
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderArticlesArchive();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Auto Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderHomeArticles();

  if (document.getElementById('articlesList')) {
    renderCategoryFilters();
    renderArticlesArchive();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }
  }
});
