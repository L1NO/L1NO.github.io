function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function openPop() {
    const popDialog = document.getElementById("popupDialog");
            popDialog.style.visibility = popDialog.style.visibility === "visible"? "hidden": "visible";
}

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('experience-details');
  if (!container || !window.experiences) return;

  container.innerHTML = experiences.map(exp => `
    <div class="details-container">
      <h2 class="experience-sub-title">${exp.category}</h2>
      <div class="article-container">
        ${exp.items.map(item => `
          <article>
            <img src="${item.icon}" alt="${item.alt}" class="icon" />
            <div>
              <h3>${item.title}</h3>
              <p>${item.level}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `).join('');

  // 專案渲染
  const projectsList = document.getElementById('projects-list');
  if (projectsList && window.projects) {
    projectsList.innerHTML = projects.map(proj => `
      <div class="details-container color-container">
        <div class="article-container">
          <img src="${proj.img}" alt="${proj.alt}" class="project-img" />
        </div>
        <h2 class="experience-sub-title project-title">${proj.title}</h2>
        <div class="btn-container">
          <button class="btn btn-color-2 project-btn" onclick="location.href='${proj.github}'">Github</button>
          <button class="btn btn-color-2 project-btn" onclick="location.href='${proj.demo}'">Live Demo</button>
        </div>
      </div>
    `).join('');
  }
});
