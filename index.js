let currentId = null;
let currentTab = null;
const tabContainerHeight = 70;

// Scroll to section on tab click
function onTabClick(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const target = document.querySelector(targetId);
  const scrollTop = target.offsetTop - tabContainerHeight + 1;
  window.scrollTo({ top: scrollTop, behavior: 'smooth' });
}

// Check tab container position and make it sticky
function checkTabContainerPosition() {
  const heroTabs = document.querySelector('.et-hero-tabs');
  const tabContainer = document.querySelector('.et-hero-tabs-container');
  const offset = heroTabs.offsetTop + heroTabs.offsetHeight - tabContainerHeight;

  if (window.scrollY > offset) {
    tabContainer.classList.add('et-hero-tabs-container--top');
  } else {
    tabContainer.classList.remove('et-hero-tabs-container--top');
  }
}

// Find which tab should be active based on scroll
function findCurrentTabSelector() {
  const tabs = document.querySelectorAll('.et-hero-tab');
  let newCurrentId = null;
  let newCurrentTab = null;

  tabs.forEach(tab => {
    const id = tab.getAttribute('href');
    const section = document.querySelector(id);
    const offsetTop = section.offsetTop - tabContainerHeight;
    const offsetBottom = section.offsetTop + section.offsetHeight - tabContainerHeight;

    if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
      newCurrentId = id;
      newCurrentTab = tab;
    }
  });

  if (currentId !== newCurrentId || currentId === null) {
    currentId = newCurrentId;
    currentTab = newCurrentTab;
    setSliderCss();
  }
}

// Set the slider's width and position under the active tab
function setSliderCss() {
  const slider = document.querySelector('.et-hero-tab-slider');
  if (currentTab) {
    const tabRect = currentTab.getBoundingClientRect();
    const containerRect = currentTab.parentElement.getBoundingClientRect();
    slider.style.width = `${tabRect.width}px`;
    slider.style.left = `${tabRect.left - containerRect.left}px`;
  }
}

// Initialize all handlers
function initStickyNavigation() {
  const tabs = document.querySelectorAll('.et-hero-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', onTabClick);
  });

  window.addEventListener('scroll', () => {
    checkTabContainerPosition();
    findCurrentTabSelector();
  });

  window.addEventListener('resize', () => {
    if (currentId) setSliderCss();
  });
}

document.addEventListener('DOMContentLoaded', initStickyNavigation);

// Back to top button logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const code = button.nextElementSibling.innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = '✅ Copied!';
        setTimeout(() => (button.innerText = '📋'), 1500);
      });
    });
  });
