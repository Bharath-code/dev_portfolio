export const initNavigation = () => {
	const navLinks = document.querySelectorAll("[data-nav-link]");
	const sections = document.querySelectorAll("section[id]");
	if (!navLinks.length || !sections.length) return;
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const targetId = `#${entry.target.id}`;
				for (const link of navLinks) {
					if (link.getAttribute("href") === targetId) {
						link.setAttribute("aria-current", "page");
					} else {
						link.removeAttribute("aria-current");
					}
				}
			}
		},
		{
			rootMargin: "-40% 0px -50% 0px",
			threshold: 0.25,
		},
	);
	for (const section of sections) {
		observer.observe(section);
	}
};
