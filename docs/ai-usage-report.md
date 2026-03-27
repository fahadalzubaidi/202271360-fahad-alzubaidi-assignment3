# AI Usage Report

This report outlines the use of Artificial Intelligence (AI) tools during the development of "SWE363 - Assignment 2: Portfolio Enhancements."

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
