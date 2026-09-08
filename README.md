# Ossian Lin — Personal Portfolio & Articles Catalog

This repository hosts the personal portfolio, project showcases, and UX research/design articles catalog for **Ossian Lin**, Product Designer & UX Researcher.

---

## 📁 Project Directory Structure

```
.
├── index.html              # Main homepage (Hero, Bio, Projects Carousel, Writing Preview)
├── projects.html           # Full Projects Archive catalog page
├── articles.html           # Full Articles Archive catalog (with real-time search & filters)
├── articles-data.js        # Centralized article database (Auto-synchronized by build_articles.py)
├── articles-render.js      # Dynamic renderer for articles list, pagination, and category filters
├── script.js               # Global UI scripts (Global Footer, Carousel Slider, Toast, Share Dialog)
├── style.css               # Core CSS design system & responsive layout styles
├── CNAME                  # Custom domain configuration (ossianlin.com)
├── README.md               # Developer documentation and maintainer guide
│
├── articles/               # Generated static HTML articles (220+ articles)
│   ├── 202309-04.html
│   └── ...
│
├── projects/               # Detailed project case studies
│   ├── project-childmind.html
│   └── project-template.html
│
├── asset/                  # Downloadable assets & PDF portfolios
│   ├── 2025_Resume_Ossian Lin.pdf
│   └── project-STEMUP.pdf
│
├── img/                    # Image assets (Avatars, Project thumbnails, Social icons)
│   ├── Lino.png
│   ├── project-Child.png
│   └── ...
│
└── tools/                  # Automation & build scripts
    ├── build_articles.py   # Article batch builder & articles-data.js synchronizer
    └── import_medium.py    # Automated Medium publication importer
```

---

## 🛠️ Content Management & Workflow

### 1. Publishing & Building Articles (`tools/build_articles.py`)

To write and publish new articles:
1. Create a `posts/` folder in the project root if it does not exist:
   ```bash
   mkdir posts
   ```
2. Place your markdown (`.md`) or text (`.txt`) draft into `posts/`. Drafts can include frontmatter:
   ```markdown
   ---
   title: "Designing for Cognitive Development"
   date: "Sep 2026"
   category: "UX Research"
   summary: "An in-depth exploration of interactive learning interfaces."
   cover: "img/project-Child.png"
   ---

   # Article Content
   Your markdown body content goes here...
   ```
3. Run the article build script:
   ```bash
   python3 tools/build_articles.py
   ```
4. The script automatically:
   - Generates static HTML articles in `articles/` with Open Graph tags and unified footers.
   - Rebuilds and synchronizes `articles-data.js` so both `index.html` and `articles.html` update immediately.

---

### 2. Importing Medium Articles (`tools/import_medium.py`)

To sync articles from Medium:
```bash
python3 tools/import_medium.py
```
This script parses exported RSS or raw HTML content from Medium and formats it for publication.

---

## 🎨 Global UI & Design System

- **Global Footer**: Driven by `initGlobalFooter()` in `script.js`. All HTML pages render a clean `<footer></footer>` shell which is automatically populated at runtime with dynamic navigation links and the current copyright year (`new Date().getFullYear()`).
- **Projects Carousel**: Driven by `initProjectsSlider()` in `script.js`. A single-card slider with flanking controls, fully responsive across all device sizes.
- **Search & Pagination**: Driven by `articles-render.js` on `articles.html`. Features real-time instant search filtering and pagination controls.
