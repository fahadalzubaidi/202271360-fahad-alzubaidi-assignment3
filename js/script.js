// ===========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('navMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ===========================================
// MOBILE MENU TOGGLE
// ===========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===========================================
// NAVBAR SCROLL EFFECT
// ===========================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================================
// DARK/LIGHT THEME TOGGLE
// ===========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ===========================================
// GREETING MESSAGE BASED ON TIME OF DAY
// ===========================================
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greeting;
    let emoji;

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
        emoji = "☀️";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
        emoji = "🌤️";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
        emoji = "🌆";
    } else {
        greeting = "Good Night";
        emoji = "🌙";
    }

    greetingElement.textContent = `${emoji} ${greeting}!`;
}

updateGreeting();

// ===========================================
// CONTACT FORM VALIDATION AND SUBMISSION
// ===========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset previous error states
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => input.classList.remove('is-invalid'));

    // Get form values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validate form
    let hasError = false;
    
    if (!name) { 
        nameInput.classList.add('is-invalid'); 
        hasError = true; 
    }
    if (!message) { 
        messageInput.classList.add('is-invalid'); 
        hasError = true; 
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        hasError = true;
    }

    if (hasError) {
        showFormStatus('Please fill in all fields correctly before sending.', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        showFormStatus('❤️ Success! Message sent successfully. I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);
});

// Real-time clearance of error states
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
            input.classList.remove('is-invalid');
            if (!contactForm.querySelector('.is-invalid')) {
                formStatus.style.display = 'none';
            }
        }
    });
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

// ===========================================
// PROJECT FILTERING AND SORTING
// ===========================================
const projectSearch = document.getElementById('projectSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectSort = document.getElementById('projectSort');

/**
 * Returns an array of all project card elements from the DOM.
 * Using a live query because cards are static in this project.
 */
function getProjectCards() {
    return Array.from(document.querySelectorAll('.project-card'));
}

/**
 * Core filter + sort function.
 * 1. Reads the current search term, active category filter, and sort order.
 * 2. Hides cards that don't match; shows matching ones.
 * 3. Re-orders visible cards in the grid according to the sort selection.
 */
function filterProjects() {
    const searchTerm = projectSearch.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const sortValue = projectSort ? projectSort.value : 'default';

    const projectCards = getProjectCards();
    const grid = document.getElementById('projectsGrid');

    // --- Step 1: Determine which cards match filter + search ---
    const matchingCards = [];
    const hiddenCards = [];

    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const category = card.dataset.category;

        const matchesSearch = !searchTerm ||
            title.includes(searchTerm) ||
            description.includes(searchTerm) ||
            tags.some(tag => tag.includes(searchTerm));

        const matchesCategory = activeFilter === 'all' || category === activeFilter;

        if (matchesSearch && matchesCategory) {
            matchingCards.push(card);
        } else {
            hiddenCards.push(card);
        }
    });

    // --- Step 2: Sort the matching cards ---
    matchingCards.sort((a, b) => {
        const titleA = a.querySelector('.project-title').textContent.trim();
        const titleB = b.querySelector('.project-title').textContent.trim();
        const tagsCountA = a.querySelectorAll('.tag').length;
        const tagsCountB = b.querySelectorAll('.tag').length;

        switch (sortValue) {
            case 'title-asc':  return titleA.localeCompare(titleB);
            case 'title-desc': return titleB.localeCompare(titleA);
            case 'tags-asc':   return tagsCountA - tagsCountB;
            case 'tags-desc':  return tagsCountB - tagsCountA;
            default: return 0; // preserve original DOM order
        }
    });

    // --- Step 3: Re-append all cards in sorted order (matching first, hidden removed) ---
    // Remove empty-state placeholder temporarily
    let emptyMessage = document.getElementById('emptySearchMessage');
    if (emptyMessage) emptyMessage.remove();

    // Re-order cards in the grid
    [...matchingCards, ...hiddenCards].forEach(card => {
        grid.appendChild(card);
    });

    // Show/hide cards with animation
    hiddenCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
    });
    matchingCards.forEach(card => {
        card.style.display = 'block';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    });

    // --- Step 4: Show empty state if nothing matches ---
    if (matchingCards.length === 0) {
        emptyMessage = document.createElement('div');
        emptyMessage.id = 'emptySearchMessage';
        emptyMessage.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3>No matches found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
        `;
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '3rem 1rem';
        emptyMessage.style.gridColumn = '1 / -1';
        emptyMessage.style.color = 'var(--color-text-tertiary)';
        grid.appendChild(emptyMessage);
    }
}

// Search input listener
if (projectSearch) {
    projectSearch.addEventListener('input', filterProjects);
}

// Sort dropdown listener
if (projectSort) {
    projectSort.addEventListener('change', filterProjects);
}

// Filter button listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply filter + sort
        filterProjects();
    });
});

// ===========================================
// GITHUB API DATA FETCHING
// ===========================================
async function fetchGitHubRepos() {
    const container = document.getElementById('github-repos-container');
    const username = 'fahadalzubaidi'; 
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }
        
        const repos = await response.json();
        
        if (repos.length === 0) {
            container.innerHTML = '<div class="error-state"><p>No public repositories found.</p></div>';
            return;
        }

        // Clear loading state
        container.innerHTML = '';

        repos.forEach((repo, index) => {
            const card = document.createElement('div');
            card.className = 'github-repo-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.5s ease ${index * 0.1}s`;

            card.innerHTML = `
                <div class="repo-header">
                    <span class="repo-icon">📁</span>
                    <div class="repo-stat">
                        <span>⭐</span>
                        <span>${repo.stargazers_count}</span>
                    </div>
                </div>
                <h3 class="repo-name">${repo.name}</h3>
                <p class="repo-description">${repo.description || 'No description provided.'}</p>
                <div class="repo-stats">
                    <div class="repo-stat">
                        <span>🔤</span>
                        <span>${repo.language || 'Mixed'}</span>
                    </div>
                    <div class="repo-stat">
                        <span>🍴</span>
                        <span>${repo.forks_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-link" aria-label="View ${repo.name} on GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            `;

            container.appendChild(card);
            
            // Trigger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        container.innerHTML = `
            <div class="error-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <p>Failed to load GitHub activity. Please check your connection or try again later.</p>
                <button onclick="fetchGitHubRepos()" class="btn btn-secondary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">Retry</button>
            </div>
        `;
    }
}

// Initialize fetch when section is visible
const githubSection = document.getElementById('github');
if (githubSection) {
    const githubObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchGitHubRepos();
            githubObserver.unobserve(githubSection);
        }
    }, { threshold: 0.1 });
    
    githubObserver.observe(githubSection);
}

// ===========================================
// SCROLL REVEAL ANIMATIONS
// ===========================================
const revealElements = document.querySelectorAll('.project-card, .skill-card, .info-item, .github-badge');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===========================================
// CURSOR GLOW EFFECT (Desktop Only)
// ===========================================
if (window.matchMedia('(min-width: 768px)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Enlarge cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ===========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ===========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
// ===========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const subtitle = document.querySelector('.hero-subtitle');
// const subtitleText = subtitle.textContent;
// typeWriter(subtitle, subtitleText, 50);

// ===========================================
// LAZY LOADING FOR IMAGES
// ===========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================================
// VISITOR TIMER — tracks time spent on page
// ===========================================
const timerDisplay = document.getElementById('timerDisplay');
let visitSeconds = 0;

/**
 * Formats seconds into a human-readable string (e.g. "2m 30s").
 */
function formatTime(secs) {
    if (secs < 60) return `${secs}s`;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
}

if (timerDisplay) {
    setInterval(() => {
        visitSeconds++;
        timerDisplay.textContent = formatTime(visitSeconds);
    }, 1000);
}

// ===========================================
// VISITOR NAME — state management with localStorage
// ===========================================
const visitorNameInput = document.getElementById('visitorNameInput');
const visitorNameBtn = document.getElementById('visitorNameBtn');
const visitorGreeting = document.getElementById('visitorGreeting');
const visitorInputRow = document.getElementById('visitorInputRow');

/**
 * Shows the personalized greeting and hides the input row.
 * Stores the name in localStorage for future visits.
 */
function showVisitorGreeting(name) {
    if (!visitorGreeting || !visitorInputRow) return;
    visitorGreeting.textContent = `👋 Welcome, ${name}! Enjoy browsing my portfolio.`;
    visitorGreeting.style.display = 'block';
    visitorInputRow.style.display = 'none';
}

// Check if visitor already introduced themselves in a previous session
const savedName = localStorage.getItem('visitorName');
if (savedName) {
    showVisitorGreeting(savedName);
}

// Handle the "Say Hi" button click
if (visitorNameBtn) {
    visitorNameBtn.addEventListener('click', () => {
        const name = visitorNameInput ? visitorNameInput.value.trim() : '';
        if (!name) {
            if (visitorNameInput) {
                visitorNameInput.classList.add('is-invalid');
                visitorNameInput.placeholder = 'Please enter your name first!';
            }
            return;
        }
        localStorage.setItem('visitorName', name);
        showVisitorGreeting(name);
    });
}

// Clear invalid state on visitor name input
if (visitorNameInput) {
    visitorNameInput.addEventListener('input', () => {
        visitorNameInput.classList.remove('is-invalid');
        visitorNameInput.placeholder = 'Enter your name for a personal greeting';
    });
}

// ===========================================
// CONSOLE MESSAGE
// ===========================================
console.log('%c👋 Hello There!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to my portfolio!', 'font-size: 14px; color: #64748b;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 12px; color: #94a3b8;');
