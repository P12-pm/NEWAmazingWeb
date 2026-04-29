/**
 * Amazing Webtech — Theme Toggle
 * Dark / Light Mode with localStorage persistence
 */
(function () {
    'use strict';

    // Get saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('amazingwebtech-theme') || 'dark';

    // Apply theme immediately (before DOM load to prevent flash)
    document.documentElement.setAttribute('data-theme', savedTheme);

    document.addEventListener('DOMContentLoaded', function () {
        // Create toggle button
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'theme-toggle';
        toggleContainer.innerHTML = `
            <button class="theme-toggle__btn" id="themeToggle" aria-label="Toggle dark/light mode" title="Toggle Theme">
                <i class="fa-solid fa-moon"></i>
                <i class="fa-solid fa-sun"></i>
            </button>
        `;
        document.body.appendChild(toggleContainer);

        const toggleBtn = document.getElementById('themeToggle');

        toggleBtn.addEventListener('click', function () {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', next);
            localStorage.setItem('amazingwebtech-theme', next);

            // Add a little animation to the button
            this.style.transform = 'scale(0.85)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
})();
