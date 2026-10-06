# Zicheng Liu — Personal Website

A professional personal website built with plain **HTML, CSS, and JavaScript** (no frameworks, no build step), designed for **GitHub Pages**.

## Live Site

> **https://galactus06.github.io/personal-website/**

## Project Structure

```
Personal Website/
├── index.html          # Main page (all content sections)
├── css/
│   └── style.css       # All styling, responsive design, animations
├── js/
│   └── main.js         # Mobile nav, scroll reveal, typewriter, particles
├── assets/             # Images used by the live site
│   ├── avatar.png          # Hero portrait (personal photo)
│   ├── about-photo.jpg     # About-section photo
│   ├── project-agentic.png # Project banner: agentic financial workflow
│   ├── project-rule72.png  # Project banner: multi-agent demo
│   ├── project-atlas.png   # Project banner: D3 player value dashboard
│   ├── github.svg          # GitHub logo (contact section)
│   └── favicon.svg         # Browser tab icon
├── 素材/               # Source material (originals, PDFs, retired placeholders)
└── README.md
```

## How to Publish on GitHub Pages

1. **Create a GitHub repository**
   - Go to <https://github.com/new>
   - Name it (e.g. `personal-website`), keep it **Public**
   - Do NOT initialize with a README (this folder already has one)

2. **Upload the files** (in a terminal, from this folder):

   ```bash
   git init
   git add .
   git commit -m "Personal website for CSE 300"
   git branch -M main
   git remote add origin https://github.com/GALACTUS06/personal-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - In the repo, go to **Settings → Pages**
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**
   - Choose branch **main**, folder **/ (root)**, then click **Save**
   - Wait ~1 minute; the live URL appears at the top of the Pages settings

4. **Done!** Your site is live. Add this link to your written explanation and Brightspace submission.

> Tip: every future `git push` to `main` updates the site automatically.

## Editing Content

- All text (bio, research, projects, contact) lives in `index.html` — just edit the HTML text and push.
- Colors and fonts are controlled by the CSS variables at the top of `css/style.css`.
- To use a real photo, replace `assets/portrait.svg` with e.g. `assets/portrait.jpg` and update the `src` in `index.html`.

## Features

- Full-page interactive particle background (mouse dodge + glow, click ripples, auto-pause on hidden tabs)
- Typewriter identity line cycling through roles
- Fully responsive (mobile, tablet, desktop) with a hamburger menu
- Sticky navigation with scroll-spy section highlighting
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Semantic HTML with ARIA labels and Open Graph / Twitter meta tags
- Fast, dependency-free static site — ideal for GitHub Pages
