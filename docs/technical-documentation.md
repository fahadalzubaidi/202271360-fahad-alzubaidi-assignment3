# Technical Documentation

## Tech Stack

- **HTML5** for semantic structure and modern accessibility.
- **CSS3** for layout, theming, responsive design, and CSS variables (Design Tokens).
- **JavaScript (ES6+)** for asynchronous data handling, dynamic filtering, and DOM manipulation.

## Key Features

### 1. Dynamic Content & Interactivity
- **Project Filtering**: A real-time filter system that allows users to sort projects by category (Machine Learning, Web Development, Automation) or search live by typing.
- **GitHub API Integration**: A "GitHub Activity" section that dynamically fetches the latest repositories from the GitHub API using `async/await`.

### 2. Advanced Data Handling
- **LocalStorage Persistence**: Theme preferences (Light/Dark mode) are stored in `localStorage` to persist across sessions.
- **Asynchronous Feedback**: Integrated loading spinners and friendly error states (with retry logic) for all API-driven content.

### 3. User Experience & Feedback
- **Robust Form Validation**: Real-time validation for the contact form with visual error highlighting on specific fields and a success confirmation animation.
- **Empty States**: Custom "No matches found" UI for search results, providing clear guidance on how to adjust filters.

### 4. Modern Animations
- **Smooth Navigation**: Smooth scrolling with offset calculations for fixed headers and active link highlighting.
- **Scroll Reveal**: Elements fade and slide into view as the user scrolls, implemented via the `IntersectionObserver` API for optimal performance.
- **Status Animations**: Custom `cubic-bezier` transitions for success/error messages to provide a premium feel.

## File Overview

- **index.html**: Main structure including Hero, Projects (with Filter), Skills, GitHub Activity, and Contact sections.
- **css/styles.css**: Comprehensive Design System using CSS variables for colors, typography, spacing, and animations.
- **js/script.js**: The core logic engine handling theme toggling, project filtering, GitHub API synchronization, and intersection observers.
- **docs/ai-usage-report.md**: Documentation of AI assistance and learning outcomes.
- **docs/technical-documentation.md**: This technical overview.
- **assets/images/**: Project images, profile photos, and CV assets.

## Customization & Maintenance

### Adding New Projects
- Add a new `<div class="project-card">` in the `index.html`.
- Use the `data-category` attribute (e.g., `machine-learning`, `web-development`) to ensure the filtering logic picks it up automatically.

### Updating GitHub Username
- In `js/script.js`, locate the `fetchGitHubRepos` function and update the `username` constant to your GitHub handle.

### Modifying Design System
- Adjust the CSS variables in the `:root` and `[data-theme="dark"]` selectors in `styles.css` to update global colors, spacing, or border-radius values.

### Adding New Skills
- Add a `<div class="skill-card">` in the skills section. These cards are automatically picked up by the scroll-reveal engine.
