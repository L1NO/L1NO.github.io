const skill = [
  // User Experience Design
  {
    category: "User Experience Design",
    items: [
      { title: "Figma" },
      { title: "Wireframing" },
      { title: "Prototyping" },
      { title: "User Flows" },
      { title: "UX writing" },
      { title: "HTML/CSS" },
      { title: "JavaScript" }
    ],
  },
  // User Experience Research
  {
    category: "User Experience Research",
    items: [
      { title: "User Interviews" },
      { title: "Surveys" },
      { title: "Card Sorting" },
      { title: "Personas" },
      { title: "Contextual Inquiry" },
      { title: "Usability Testing" },
      { title: "A/B Testing" },
    ],
  },
];

function renderskill() {
  const frontendContainer = document.querySelector('.frontend-skill');
  const backendContainer = document.querySelector('.backend-skill');

  if (frontendContainer) {
    frontendContainer.innerHTML = frontendskill.map(experience => `<p>${experience}</p>`).join('');
  }
  if (backendContainer) {
    backendContainer.innerHTML = backendskill.map(experience => `<p>${experience}</p>`).join('');
  }
}

function renderskill() {
  const skillGroup = document.querySelector('.skill-group');
  if (!skillGroup) return;

  // Clear existing content
  skillGroup.innerHTML = '';

  skill.forEach(exp => {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const h3 = document.createElement('h3');
    h3.textContent = exp.category;
    wrapper.appendChild(h3);

    const article = document.createElement('article');
    article.className = 'skill-items';

    exp.items.forEach(item => {
      const p = document.createElement('p');
      p.textContent = item.title;
      article.appendChild(p);
    });

    wrapper.appendChild(article);
    skillGroup.appendChild(wrapper);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderskill();
  renderskill();
});