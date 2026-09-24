// Footer year(s)
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Highlight the current section in the nav while scrolling.
// Keeps the page scannable — you always know where you are without hunting.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
  const linkFor = (id) =>
    document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// Click-to-copy email address
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    const label = button.querySelector('.copy-label');
    const originalText = label ? label.textContent : button.textContent;

    try {
      await navigator.clipboard.writeText(value);
      if (label) label.textContent = 'Copied';
      else button.textContent = 'Copied';
    } catch (err) {
      if (label) label.textContent = value;
      else button.textContent = value;
    }

    setTimeout(() => {
      if (label) label.textContent = originalText;
      else button.textContent = originalText;
    }, 1800);
  });
});