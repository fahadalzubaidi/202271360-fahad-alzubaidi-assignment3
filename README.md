# Personal Portfolio | SWE363 - Assignment 3

## Project Description
A premium, highly interactive personal portfolio website for **Fahad Alzubaidi**, enhanced with dynamic content, real-time data fetching, and sophisticated animations.

## Key Features
- **Dynamic Content Filtering**: Real-time project search and category filtering for a seamless user experience.
- **Live Data Handling**: Integration with the **GitHub API** to fetch and display repository activity dynamically.
- **Premium Animations**: Staggered scroll-reveal effects and spring-based UI transitions.
- **Robust Feedback Loops**: Comprehensive form validation, loading indicators, and informative empty/error states.
- **Responsive Design**: Optimized for all devices, from mobile phones to high-resolution desktops.

## Project Structure
- `index.html`: Main application entry point.
- `css/styles.css`: Centralized design system and animations.
- `js/script.js`: Core logic for filtering, API fetching, and interactivity.
- `docs/`: Technical documentation and AI usage reports.

## Setup & Running Locally
1.  **Clone the Repository**: Download the project files to your local machine.
2.  **Open the Site**: Simply open `index.html` in any modern web browser (Edge, Chrome, Safari). No build step or server is needed.
3.  **Dependencies**: None. The project uses vanilla JS and CSS for maximum compatibility and performance.

---

## 🧭 How to Use This Portfolio — Step-by-Step Guide

This section walks you through every interactive feature of the site.

### Step 1 — Navigate Between Sections
1. Look at the **top navigation bar** (always visible as you scroll).
2. Click any of the links — **About Me**, **Projects**, **Skills**, **Activity**, or **Contact** — to smoothly scroll to that section.
3. The active section is **highlighted** in the nav bar automatically as you scroll down the page.
4. On **mobile devices**, tap the ☰ hamburger icon (top-right) to open the menu, then tap a link. The menu closes automatically after selection.

### Step 2 — Toggle Light / Dark Mode
1. Locate the **sun/moon icon button** in the top-right corner of the navigation bar.
2. Click it once to switch to **dark mode**; click again to return to **light mode**.
3. Your preference is **saved automatically** — the site will remember your choice the next time you visit.

### Step 3 — Browse & Filter Projects
1. Scroll down to the **Featured Projects** section (or click **Projects** in the nav).
2. **Search by keyword**: Click the search bar at the top of the section and type any keyword (e.g., `Python`, `Machine Learning`, `inventory`). Results update in real time as you type.
3. **Filter by category**: Click one of the category buttons below the search bar:
   - **All** — shows every project.
   - **Machine Learning** — shows only ML projects.
   - **Web Development** — shows only web projects.
   - **Automation** — shows only automation projects.
4. You can **combine** search and category filter at the same time for precise results.
5. If no projects match your query, a **"No matches found"** message appears. Clear the search or select **All** to reset.

### Step 4 — View GitHub Activity
1. Scroll to the **Latest Repositories** section (or click **Activity** in the nav).
2. Repository cards are **fetched live from GitHub** — a loading spinner appears briefly while data loads.
3. Each card shows the **repository name**, description, primary language, star count, and fork count.
4. Click the **external link icon** (↗) on any card to open that repository directly on GitHub in a new tab.
5. If the API call fails (e.g., no internet connection), an error message is shown with a **Retry** button — click it to try fetching again.

### Step 5 — Send a Message via the Contact Form
1. Scroll to the **Get In Touch** section (or click **Contact** in the nav, or click the **"Get In Touch"** button on the hero).
2. Fill in the three required fields:
   - **Name** — your full name.
   - **Email** — a valid email address (e.g., `user@example.com`).
   - **Message** — describe your project or inquiry.
3. Click the **Send Message** button.
4. **Validation** runs automatically:
   - If any field is empty or the email is invalid, that field is highlighted in red and an error message appears below the form.
   - Fix the highlighted fields and click Send again.
5. On success, the button shows **"Sending Message..."** briefly, then a green **"✅ Success!"** confirmation appears. The form resets automatically.
6. The success message disappears after 5 seconds.

### Step 6 — Download My CV
1. On the **hero (home) section**, click the **"Download My CV"** button.
2. The PDF will download directly to your device.

---

## AI Integration
This project was developed using **Antigravity (powered by Google Gemini)** as an agentic coding assistant. AI was used for:
- Architecture planning and logic implementation.
- API data normalization and integration.
- Advanced CSS animation timing and design tokens.

*Full transparency on AI usage can be found in [docs/ai-usage-report.md](docs/ai-usage-report.md).*

## Live Deployment
[View Live Portfolio](https://fahadalzubaidi.github.io/202271360-fahad-alzubaidi-assignment3/)
