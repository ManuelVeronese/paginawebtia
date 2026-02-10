const navMain = document.querySelector('.nav-main');

const sr = ScrollReveal({
    distance: '24px',
    origin: 'bottom',
    duration: 650,
    easing: 'ease-out',
    mobile: true,
    reset: false
});

sr.reveal('.hero-content', { delay: 150 });
sr.reveal('.service-row', { delay: 200, interval: 120 });
sr.reveal('.about-card', { delay: 250 });
sr.reveal('.contact-card', { delay: 250 });
sr.reveal('.site-footer', { delay: 200 });

let lastScrollY = window.scrollY;
const MOBILE_HIDE_THRESHOLD = 40;
const DESKTOP_HIDE_THRESHOLD = 80;
let scrollThreshold = window.innerWidth <= 700 ? MOBILE_HIDE_THRESHOLD : DESKTOP_HIDE_THRESHOLD;

window.addEventListener('resize', () => {
    scrollThreshold = window.innerWidth <= 700 ? MOBILE_HIDE_THRESHOLD : DESKTOP_HIDE_THRESHOLD;
});

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const isMobile = window.innerWidth <= 700;

    if (currentScrollY <= 4) {
        navMain.classList.remove('nav-hidden');
    } else if (currentScrollY > scrollThreshold && scrollingDown) {
        navMain.classList.add('nav-hidden');
    } else {
        navMain.classList.remove('nav-hidden');
    }

    if (currentScrollY > 10) {
        navMain.classList.add('scrolled');
    } else {
        navMain.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});


const sectionLinks = Array.from(document.querySelectorAll('.nav-menu a'));
const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const activeId = `#${entry.target.id}`;
            sectionLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === activeId);
            });
        });
    },
    {
        root: null,
        threshold: 0.55
    }
);

sections.forEach((section) => observer.observe(section));