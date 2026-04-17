# Technical Documentation

## Tech Stack

- **HTML5** for semantic structure and modern accessibility.
- **CSS3** for layout, theming, responsive design, and CSS variables (Design Tokens).
- **JavaScript (ES6+)** for asynchronous data handling, dynamic filtering/sorting, DOM manipulation, and state management.

---

## Key Features

### 1. Dynamic Content & Interactivity
- **Project Filtering + Sorting**: A real-time filter system that allows users to filter projects by category (Machine Learning, Web Development, Automation), search live by typing, AND sort results by title (A→Z, Z→A) or tag count.
- **GitHub API Integration**: A "GitHub Activity" section that dynamically fetches the latest repositories from the GitHub API using `async/await`.

### 2. Advanced Data Handling & State Management
- **LocalStorage Persistence**: Theme preferences (Light/Dark mode) and visitor name are stored in `localStorage` to persist across sessions.
- **Asynchronous Feedback**: Integrated loading spinners and friendly error states (with retry logic) for all API-driven content.
- **Visitor Name Widget**: The visitor enters their name and receives a personalized greeting that persists on future visits.

### 3. User Experience & Feedback
- **Robust Form Validation**: Real-time validation for the contact form with visual error highlighting (red border + shake animation) on specific fields and a success confirmation animation.
- **Empty States**: Custom "No matches found" UI for search results, providing clear guidance on how to adjust filters.
- **Visit Timer**: A live counter that shows how long the visitor has been on the page.

### 4. Modern Animations
- **Smooth Navigation**: Smooth scrolling with offset calculations for fixed headers and active link highlighting.
- **Scroll Reveal**: Elements fade and slide into view as the user scrolls, implemented via the `IntersectionObserver` API for optimal performance.
- **Status Animations**: Custom `cubic-bezier` transitions for success/error messages to provide a premium feel.

---

## Code Architecture & Key Snippets

### Filter + Sort Logic (`js/script.js`)

The `filterProjects()` function combines three inputs — search text, category filter, and sort order — into a single unified pipeline:

```javascript
function filterProjects() {
    const searchTerm = projectSearch.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const sortValue = projectSort ? projectSort.value : 'default';

    const projectCards = getProjectCards();
    const matchingCards = [];
    const hiddenCards = [];

    // Step 1: Filter cards by search + category
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const matchesSearch = !searchTerm || title.includes(searchTerm);
        const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;

        if (matchesSearch && matchesCategory) {
            matchingCards.push(card);
        } else {
            hiddenCards.push(card);
        }
    });

    // Step 2: Sort the matching cards
    matchingCards.sort((a, b) => {
        switch (sortValue) {
            case 'title-asc':  return titleA.localeCompare(titleB);
            case 'title-desc': return titleB.localeCompare(titleA);
            // ... other sort options
        }
    });

    // Step 3: Re-order DOM nodes + show/hide with animation
}
```

### State Management with localStorage (`js/script.js`)

Visitor name is saved and restored across sessions:

```javascript
// Save
localStorage.setItem('visitorName', name);

// Restore on page load
const savedName = localStorage.getItem('visitorName');
if (savedName) {
    showVisitorGreeting(savedName);
}
```

### GitHub API Fetch with Error Handling (`js/script.js`)

```javascript
async function fetchGitHubRepos() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        const repos = await response.json();
        // ... render cards
    } catch (error) {
        // Show error state with Retry button
        container.innerHTML = `<div class="error-state">
            <p>Failed to load GitHub activity.</p>
            <button onclick="fetchGitHubRepos()">Retry</button>
        </div>`;
    }
}
```

### CSS Design System (`:root` in `css/styles.css`)

All colors, spacing, and typography are defined as CSS custom properties so a single change propagates everywhere:

```css
:root {
    --color-primary: hsl(210, 90%, 55%);
    --color-bg-primary: hsl(0, 0%, 100%);
    --font-primary: 'Inter', -apple-system, sans-serif;
    --spacing-md: 1.5rem;
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
    --color-primary: hsl(210, 90%, 60%);
    --color-bg-primary: hsl(210, 15%, 8%);
}
```


## Performance Optimization

| Optimization | Implementation |
|---|---|
| **Lazy loading images** | All `<img>` tags use `loading="lazy"` to defer off-screen images |
| **Deferred API calls** | GitHub API fetch is triggered by `IntersectionObserver` — only fires when the section enters the viewport |
| **CSS Custom Properties** | No repeated color/spacing values; a single `:root` change propagates everywhere |
| **Minimal dependencies** | Zero npm packages or external JS libraries — only Google Fonts loaded externally |
| **Efficient DOM queries** | `querySelectorAll` scoped to `.project-card` only when needed, not on every scroll event |

---

## Comprehensive Testing Procedures

To ensure the application meets high standards of stability and performance, the following testing procedures were executed.

### 1. Manual Unit Testing (Interaction Blocks)
Each major UI component was tested for isolated behavior:
- **Theme Toggle**: Verified that clicking the toggle switches all CSS variables immediately and updates `localStorage`. Tested that the preference persists after a hard browser refresh (F5).
- **Visitor Widget**: Entered various inputs (long strings, special characters, empty strings). Confirmed that empty input triggers the "shake" animation and red border.
- **Visit Timer**: Verified that the timer starts immediately on load and increments accurately against a stopwatch.

### 2. Integration & API Testing
Testing the synchronization between the local state and external data:
- **Search + Category Filter**: Verified "Stacked Filters" (e.g., searching for "Python" while the "Machine Learning" category is active). Confirmed that the "No matches found" UI only appears when the intersection of filters is empty.
- **GitHub API Lifecycle**: 
    - **Happy Path**: Confirmed up to 6 repos load within 2 seconds on a stable connection.
    - **Error Handling**: Simulated a network failure by enabling "Offline" mode in Chrome DevTools. Verified that the loading spinner is replaced by an error message and a working **Retry** button.
    - **Re-connection**: Turned network back on and clicked Retry; verified data populated correctly.

### 3. Responsive & Cross-Browser Testing
| Browser/Device | Tested Features | Outcome |
|----------------|-----------------|---------|
| **Chrome (Desktop)** | All animations, API fetch, Sticky Nav | PASS |
| **Firefox (Desktop)** | Filter logic, SVG icons, Scroll reveals | PASS |
| **Mobile (iPhone 13)** | Mobile menu toggle, card stack layout, touch targets | PASS |
| **Tablet (iPad)** | Grid layout responsiveness, font-size scaling | PASS |

### 4. Performance & Audit Details
The application was evaluated using Chrome Lighthouse to ensure optimization:
- **LCP (Largest Contentful Paint)**: Optimized by utilizing `loading="lazy"` on the hero image and project thumbnails.
- **TBT (Total Blocking Time)**: Minimized by using zero external JavaScript libraries and keeping `script.js` lightweight.
- **Accessibility**: All interactive elements have `aria-label` or `label` tags; contrast ratios meet WCAG AA standards.

---


The following walkthroughs describe exactly how a visitor should interact with each major feature.

### Browsing & Filtering Projects

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the **Projects** section via the nav bar or by scrolling. | The page smoothly scrolls and the "Projects" nav link becomes active. |
| 2 | Type a keyword (e.g. `Python`) into the **search box**. | Cards that don't match instantly hide; matching cards remain visible. |
| 3 | Click a **category button** (e.g. `Machine Learning`). | Only projects tagged with that category are shown; other filters stack with the search. |
| 4 | Select a **sort order** from the "Sort by" dropdown (e.g. `Title A → Z`). | Visible cards are re-ordered accordingly. |
| 5 | Click **All** to reset the category filter. | All projects reappear (search term still active if typed). |
| 6 | Clear the search box. | All category-matching projects reappear. |
| 7 | Enter a term that matches nothing. | A "🔍 No matches found" message replaces the grid with advice to adjust filters. |

### Viewing GitHub Activity

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Scroll to the **Latest Repositories** section. | A loading spinner appears while the GitHub API is called. |
| 2 | Wait ~1 second for data to load. | Up to 6 repository cards appear, each showing name, description, language, stars, and forks. |
| 3 | Click the **↗ link icon** on any card. | The repository opens in a **new browser tab** on GitHub.com. |
| 4 | (If no internet) Observe the error state. | An error message and a **Retry** button appear. Clicking Retry re-triggers the fetch. |

### Sending a Contact Message

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Scroll to **Get In Touch** or click the "Get In Touch" hero button. | Page scrolls to the contact section. |
| 2 | Fill in **Name**, **Email**, and **Message** fields. | Fields are highlighted on focus; labels remain visible. |
| 3 | Click **Send Message** with all fields valid. | Button text changes to "Sending Message..." and disables for 1.5 s. |
| 4 | Observe the success confirmation. | A green "❤️ Success! Message sent successfully." banner appears below the form. |
| 5 | Wait 5 seconds. | The success banner fades away automatically; the form is cleared. |
| 6 | Submit with an empty or invalid field. | That field turns red with a shake animation; an error banner explains what needs fixing. Typing in the field removes the red highlight immediately. |

---

## File Overview

- **index.html**: Main structure including Hero (with visitor widget), Projects (with Filter+Sort), Skills, GitHub Activity, and Contact sections.
- **css/styles.css**: Comprehensive Design System using CSS variables for colors, typography, spacing, and animations.
- **js/script.js**: The core logic engine handling theme toggling, project filtering+sorting, GitHub API synchronization, visitor name state, visit timer, and intersection observers.
- **docs/ai-usage-report.md**: Documentation of AI assistance and learning outcomes.
- **docs/technical-documentation.md**: This technical overview.
- **assets/images/**: Project images, profile photos, and CV assets.

## Customization & Maintenance

### Adding New Projects
- Add a new `<div class="project-card" data-category="your-category" data-date="YYYY-MM">` in the `index.html`.
- Use the `data-category` attribute (e.g., `machine-learning`, `web-development`) to ensure the filtering logic picks it up automatically.

### Updating GitHub Username
- In `js/script.js`, locate the `fetchGitHubRepos` function and update the `username` constant to your GitHub handle.

### Modifying Design System
- Adjust the CSS variables in the `:root` and `[data-theme="dark"]` selectors in `styles.css` to update global colors, spacing, or border-radius values.

### Adding New Skills
- Add a `<div class="skill-card">` in the skills section. These cards are automatically picked up by the scroll-reveal engine.
