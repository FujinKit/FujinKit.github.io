// Tab switching
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.tab-section');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const tabId = link.getAttribute('data-tab');

        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        const target = document.getElementById(tabId);
        if (target) {
            target.classList.add('active');
            target.classList.remove('hidden');
        }

        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    });
});

// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const code = button.nextElementSibling.innerText;
        navigator.clipboard.writeText(code).then(() => {
            button.innerText = '✅ Copied!';
            setTimeout(() => (button.innerText = '📋'), 1500);
        });
    });
});
