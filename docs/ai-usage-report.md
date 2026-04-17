# AI Usage Report

This report outlines the use of Artificial Intelligence (AI) tools during the development of "SWE363 - Assignment 3: Advanced Functionality."

## 1. Tools Used & Use Cases

### Antigravity (Powered by Google Gemini)
*   **Use Case: Component Implementation**
    *   Used to plan and implement the **Dynamic Project Filter**. The AI helped generate the logic for filtering projects by category and the live search functionality.
*   **Use Case: API Integration**
    *   Used to integrate the **GitHub repositories API**. The tool provided the `async/await` fetch logic and suggested the structure for real-time repository cards.
*   **Use Case: Design Enhancements**
    *   The AI suggested premium CSS tokens (gradients, glassmorphism) and implemented **IntersectionObserver-based scroll reveals** to make the site feel more dynamic and polished.
*   **Use Case: Debugging & Refinement**
    *   Used to ensure form validation was robust and to implement real-time error clearance when the user corrects their input.

## 2. Benefits & Challenges

### Benefits
*   **Speed & Efficiency**: Writing complex JavaScript logic (like filtering two sets of data simultaneously) was significantly faster than manual coding.
*   **Premium Aesthetics**: The AI provided sophisticated CSS suggestions (transition timing functions, shadows) that improved the visual quality of the project beyond basic CSS.
*   **Problem-Solving**: It provided clear patterns for handling asynchronous API requests, particularly the "Loading" and "Retry" feedback loops.

### Challenges
*   **Design Consistency**: Initially, AI-generated components used generic styles. I had to explicitly direct it to use my existing CSS variables (e.g., `--color-primary`, `--spacing-md`) to maintain a cohesive look.
*   **Context Management**: While implementing new features, I had to be careful that the AI didn't overwrite or duplicate existing logic like the `IntersectionObserver` already present in the codebase.

## 3. Learning Outcomes

*   **Asynchronous JavaScript**: I deepened my understanding of the `fetch` API, particularly how to handle different response states (Loading, Success, and Error) in an "agentic" way.
*   **Intersection Observer API**: Learned how to trigger animations only when elements enter the viewport, which optimizes browser performance.
*   **API Data Normalization**: I gained experience in mapping JSON data from a public API (GitHub) into custom HTML components.
*   **Logic Abstraction**: Improved my ability to write reusable functions (e.g., `filterProjects()`) that handle multiple inputs like search text and category buttons.

## 4. Responsible Use & Modifications

To ensure academic integrity and originality:
*   **Manual Review**: Every line of code suggested by the AI was reviewed for correctness and fit within the project structure.
*   **Logic Modifications**: I modified the filtering logic to prioritize search matches over category matches to provide a more intuitive search experience.
*   **Design Token Integration**: I manually mapped all AI-generated styles to use the project's predefined CSS custom properties (Design Tokens) to ensure a consistent design system.
*   **Original Improvements**: I added custom "empty state" icons and specific success/error messages that weren't part of the initial AI suggestions, ensuring the user feedback was personalized and helpful.

---

## Assignment 3 – Additional AI Use Cases

### New Features Implemented with AI Assistance

*   **Use Case: Project Sort Logic**
    *   AI helped design the `filterProjects()` refactor to integrate sorting by title (A→Z, Z→A) and tag count, while keeping the category filter and live search working simultaneously. I manually reviewed the DOM re-ordering approach and added the step-by-step inline comments.

*   **Use Case: Visitor Timer**
    *   AI suggested the `setInterval` + `formatTime` pattern for displaying a live visit-duration counter. I added the `formatTime` function myself to format seconds into a human-readable `Xm Ys` format.

*   **Use Case: Visitor Name State Management**
    *   AI provided the `localStorage` save/load pattern for persisting visitor names across sessions. I designed the UI layout (inline input + button in the hero section) and added the `is-invalid` shake animation for empty-submission feedback.

*   **Use Case: CSS Bug Fixes**
    *   AI identified that `.is-invalid` and `.nav-link.active` CSS classes were referenced in JavaScript but had no matching CSS rules. I reviewed and confirmed this was a real bug before accepting the fix.

### Assignment 3 Benefits & Challenges

*   **Benefit**: AI accelerated implementation of complex features like combined filter+sort DOM manipulation, which would have taken significantly more trial-and-error manually.
*   **Challenge**: The AI's initial sort suggestion mutated the original NodeList directly, which caused bugs. I corrected this by using `querySelectorAll` as a fresh array inside `filterProjects()`.

### Assignment 3 Learning Outcomes

*   **DOM Manipulation**: Learned how to re-order DOM elements dynamically by appending nodes to a parent grid in sorted order.
*   **`localStorage` State**: Gained hands-on experience storing and retrieving non-critical user preferences across browser sessions.
*   **`setInterval` & Timers**: Learned how to run recurring background tasks without blocking the main thread.

---

## 5. Example Prompts Used

Below are real prompts I used during development, along with the context in which they were applied:

| # | Prompt Summary | Context / Purpose |
|---|---|---|
| 1 | *"Add a sort dropdown to the projects section that works alongside the existing category filter and search bar."* | Extending the existing filter-only logic to also support sorting by title and tag count. |
| 2 | *"Create a visitor name input that stores the name in localStorage and shows a personalized greeting on future visits."* | Implementing state management with `localStorage`. |
| 3 | *"Add a live timer that shows how long the visitor has been on the page, formatted as Xm Ys."* | Adding a timer/counter feature for complex logic. |
| 4 | *"The JS adds `.is-invalid` to form inputs but there is no CSS rule for it. Fix it."* | AI identified a CSS bug — JavaScript referenced a class that had no styling. |
| 5 | *"Check the code for repeated CSS and JS that targets elements that do not exist in the HTML."* | Code quality audit to find and remove dead selectors like `.skill-item` and `.stat-card`. |
| 6 | *"Add step-by-step user guidance for navigating the projects section, contact form, and GitHub activity section."* | Improving user experience documentation with concrete walkthrough tables. |

---

## 6. Risks of AI Usage

Using AI tools in development carries several risks that I encountered and considered:

### Risk 1: Incorrect or Outdated Code
AI may generate code using deprecated APIs or syntax that doesn't work in all browsers. For example, the AI initially suggested `NodeList.forEach()` without converting to an array first, which can cause issues in older browsers.

### Risk 2: Dead Code and Phantom Selectors
AI can generate CSS and JS that target HTML elements or classes that don't actually exist in the project. In this project, the AI created an observer for `.skill-item` and included `.stat-card` and `.skill-category` in a query selector — none of these classes existed in `index.html`.

### Risk 3: Context Loss and Overwrites
When implementing new features, AI may not fully "remember" all existing code. This can lead to duplicated logic (e.g., two separate `@media (max-width: 768px)` blocks) or accidental overwrites of working functions.

### Risk 4: Over-Reliance and Lack of Understanding
Blindly accepting AI suggestions can lead to shipping code that the developer doesn't fully understand. This makes debugging difficult and undermines learning.

### Risk 5: Security and Privacy Concerns
AI tools may suggest storing sensitive data in `localStorage` without encryption, or generate API calls without proper error handling, potentially exposing user data or API keys.

---

## 7. How I Mitigated These Risks

Each risk above was addressed with a specific strategy:

| Risk | Mitigation Strategy | Example |
|------|---------------------|---------|
| **Incorrect code** | Manually tested every AI suggestion in Chrome DevTools before committing. | Tested the sort function with all 5 dropdown options to confirm correct ordering. |
| **Dead code / phantom selectors** | Ran a search across all HTML files for every CSS class and JS selector the AI generated. | Found and removed `.skill-item`, `.stat-card`, and `.skill-category` references that had no matching HTML elements. |
| **Context loss / overwrites** | Reviewed full file diffs after each AI edit to catch duplicated blocks. | Discovered and merged two duplicate `@media (max-width: 768px)` blocks and two duplicate `@media (max-width: 480px)` blocks. |
| **Over-reliance** | For every AI-generated function, I wrote inline comments explaining the logic in my own words. | Added step-by-step comments (`// Step 1: Filter`, `// Step 2: Sort`, etc.) to `filterProjects()` to prove understanding. |
| **Security concerns** | Only stored non-sensitive data (theme preference, visitor first name) in `localStorage`. No API keys or personal data are exposed. | The GitHub API is called without authentication (public endpoint only), so no keys are leaked. |

### Summary

AI was a powerful accelerator for this project, but it required consistent manual review, testing, and adaptation. The most important lesson: **AI is a tool, not a replacement for understanding.** Every suggestion was validated, tested, and modified to fit the project's specific architecture and design system.
