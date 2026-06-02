# CodeAlpha Tasks Portfolio

Welcome to the **CodeAlpha Tasks Portfolio**. This repository contains four distinct front-end web development projects built with clean semantic HTML, modular vanilla CSS, and interactive JavaScript. Each project is designed with modern UI/UX aesthetics, responsiveness, and performance in mind.

---

## 📂 Project Structure

```text
CodeAlpha/
├── README.md
├── Task 1/              # Luminary Gallery
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
├── Task 2/              # Calculus (Calculator)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Task 3/              # Portfolio Website
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── avatar.png
└── Task 4/              # Spotify Clone
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 Projects Overview

### 📸 Task 1: Luminary Gallery — Explore the World
A premium, highly interactive image gallery showcasing breathtaking photographs across different nature, landscape, urban, and cosmic categories.

*   **Design & Aesthetics:** Incorporates Outfit and Playfair Display typography, soft blur overlay elements, background gradients, and smooth card-hover animations.
*   **Key Features:**
    *   **Interactive Filters:** Category-based tabs (🌿 Nature, 🏔 Landscape, 🌆 Urban, ✨ Cosmic) to dynamically filter images without page refreshes.
    *   **Real-time Image Filters:** Custom CSS filters panel to apply instant visual transformations (Black & White, Sepia, Vivid, Cool, Warm) to the gallery.
    *   **Advanced Lightbox Dialog:** Fully custom modal viewer complete with background dimming, close control, previous/next image navigation, thumbnail strip, and a current count indicator.
    *   **Accessibility:** Includes keyboard controls (Escape to exit, Arrow keys for navigating) and ARIA attributes for modal states.

---

### 🧮 Task 2: Calculus — Premium Calculator
A gorgeous calculator application featuring a sleek glassmorphic container and vibrant, floating neon backdrop orbs.

*   **Design & Aesthetics:** Glassmorphic layout using modern backdrop-filter techniques, soft shadows, custom font pairings (Outfit and JetBrains Mono), and animated backdrop elements.
*   **Key Features:**
    *   **Arithmetic Engine:** Supports all basic arithmetic operations, percentage calculation, and toggle-able positive/negative signs.
    *   **Keyboard Support:** Listeners mapped to physical keyboard input for rapid operations.
    *   **Real-Time Preview:** Separate display rows showing the current mathematical expression and an instantaneous preview of the evaluated result.
    *   **History Panel:** An expandable, slide-out history panel that tracks past operations with the ability to clear them.

---

### 💻 Task 3: Shail's Developer Portfolio
A personal, single-page portfolio website designed to showcase projects, skills, resume, and experience in a modern tech-themed design.

*   **Design & Aesthetics:** Built using neon accents, a dark background with an interactive HTML5 particles canvas, Outfit and JetBrains Mono typography, custom cursor-glow tracker, and scroll-triggered animations.
*   **Key Features:**
    *   **Dynamic UI Elements:** Real-time typewriter effect in the hero header, custom interactive counter widgets for key developer statistics, and dynamic skill proficiency bars.
    *   **Filterable Projects:** An interactive grid of featured project cards categorized by tech stack (Full Stack, Frontend, Backend) with smooth transition filters.
    *   **Experience & Education Timeline:** A visual vertical timeline highlighting career and education landmarks.
    *   **Validated Contact Form:** Fully styled form featuring real-time input validation, responsive load animations, and post-submission success feedback.

---

### 🎵 Task 4: Spotify Clone — Music Player
A detailed replica of the Spotify web player interface, featuring full integration with local HTML5 audio playback and user libraries.

*   **Design & Aesthetics:** Implements a dark mode music player shell with responsive sidebars, bottom playbar, and a dynamic gradient header.
*   **Key Features:**
    *   **Audio Controller:** Integrated HTML5 Audio player backing play, pause, progress seeking, volume sliding, muting, shuffle, and repeat modes.
    *   **Custom Playlists:** A fully featured playlist manager allowing creation of playlists via modal dialogs, addition of songs through dropdown menus, clearing tracks, renaming, or deleting playlists entirely.
    *   **Real-Time Queue & Metadata:** Side panels displays "Now Playing" metadata with large cover arts and a "Next Up" list representing current queue items.
    *   **Search Functionality:** An inline filter matching queries to titles and artists inside the track library.

---

## 🛠️ Tech Stack Used

*   **Structure:** HTML5 (Semantic elements, accessibility landmarks)
*   **Style:** CSS3 (Flexbox/Grid layout, animations, CSS Variables, Glassmorphism)
*   **Behavior:** Vanilla JavaScript (ES6+, DOM Manipulation, Event Handling, Web Audio APIs)
*   **Icons:** FontAwesome (Task 3) / Custom Inline SVGs (Task 4)

---

## 📖 How to Run the Projects

Since all projects are built using native front-end technologies without heavy compilation steps, you can run them using any of the following methods:

### Method 1: Local File System (Double Click)
1. Navigate to the task directory (e.g. `Task 1`).
2. Double-click the `index.html` file to open it directly in any modern web browser (Chrome, Firefox, Safari, Edge).

### Method 2: Live Server (Recommended)
If you use VS Code:
1. Install the **Live Server** extension by Ritwick Dey.
2. Right-click `index.html` in any of the Task folders and select **"Open with Live Server"**.
3. This serves the site locally (usually on `http://127.0.0.1:5500`), enabling auto-reload upon code modifications.

### Method 3: Python HTTP Server (Terminal)
If you have Python installed, open your command terminal in the root directory and run:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser and click on any Task directory to explore.
