import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;
const animationConfigPath = "/assets/data/animations.json";
const contentConfigPath = "/assets/data/site-content.json";

const themeToggleButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon path");

const setTheme = (mode) => {
	if (mode === "dark") {
		document.documentElement.classList.add("dark");
		themeIcon?.setAttribute(
			"d",
			"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
		);
	} else {
		document.documentElement.classList.remove("dark");
		themeIcon?.setAttribute(
			"d",
			"M12 3v2.4M12 18.6V21M4.8 12H3M21 12h-2.4M5.636 5.636 7.124 7.124M18.364 18.364 16.876 16.876M5.636 18.364l1.488-1.488M18.364 5.636l-1.488 1.488M12 8.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z",
		);
	}
	localStorage.setItem("theme-preference", mode);
};

const currentTheme = () => {
	const stored = localStorage.getItem("theme-preference");
	if (stored) return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const toggleTheme = () => {
	const next = currentTheme() === "dark" ? "light" : "dark";
	setTheme(next);
};

themeToggleButton?.addEventListener("click", toggleTheme);

setTheme(currentTheme());

const yearEl = document.getElementById("year");
if (yearEl) {
	yearEl.textContent = new Date().getFullYear().toString();
}

const loadAnimationConfig = async () => {
	try {
		const response = await fetch(animationConfigPath);
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
};

const loadSiteContent = async () => {
	try {
		const response = await fetch(contentConfigPath);
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
};

const createTag = (label) => {
	const span = document.createElement("span");
	span.className =
		"rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand";
	span.textContent = label;
	return span;
};

const renderProjects = (projects) => {
	const container = document.getElementById("projects-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(projects)) return;
	for (const project of projects) {
		const article = document.createElement("article");
		article.className =
			"group flex flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/20 dark:border-slate-800 dark:bg-slate-900/80";

		const metaRow = document.createElement("div");
		metaRow.className =
			"flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500";
		const meta = document.createElement("span");
		meta.textContent = project.meta ?? "";
		const badge = document.createElement("span");
		badge.className = "font-medium text-brand";
		badge.textContent = project.badge ?? "";
		metaRow.append(meta, badge);

		const title = document.createElement("h3");
		title.className = "mt-4 text-2xl font-semibold";
		title.textContent = project.title ?? "";

		const description = document.createElement("p");
		description.className =
			"mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		if (project.descriptionHtml) {
			description.innerHTML = project.descriptionHtml;
		} else if (project.description) {
			description.textContent = project.description;
		}

		const tagsWrapper = document.createElement("div");
		tagsWrapper.className =
			"mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500";
		for (const tag of project.tags ?? []) {
			tagsWrapper.append(createTag(tag));
		}

		article.append(metaRow, title, description, tagsWrapper);
		container.append(article);
	}
};

const renderSkills = (skills) => {
	const container = document.getElementById("skills-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(skills)) return;
	for (const skill of skills) {
		const card = document.createElement("div");
		card.className =
			"rounded-3xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/80";

		const title = document.createElement("h3");
		title.className = "text-lg font-semibold";
		title.textContent = skill.title ?? "";

		const description = document.createElement("p");
		description.className =
			"mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		description.textContent = skill.description ?? "";

		const tagsWrapper = document.createElement("div");
		tagsWrapper.className =
			"mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500";
		for (const tag of skill.tags ?? []) {
			tagsWrapper.append(createTag(tag));
		}

		card.append(title, description, tagsWrapper);
		container.append(card);
	}
};

const renderExperience = (experiences) => {
	const container = document.getElementById("experience-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(experiences)) return;
	for (const experience of experiences) {
		const article = document.createElement("article");
		article.className =
			"flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900/80";

		const contentWrapper = document.createElement("div");
		const title = document.createElement("h3");
		title.className = "text-xl font-semibold";
		title.textContent = experience.title ?? "";
		const description = document.createElement("p");
		description.className = "mt-2 text-sm text-slate-600 dark:text-slate-300";
		description.textContent = experience.description ?? "";
		contentWrapper.append(title, description);

		const period = document.createElement("div");
		period.className = "text-xs uppercase tracking-[0.3em] text-slate-500";
		period.textContent = experience.period ?? "";

		article.append(contentWrapper, period);
		container.append(article);
	}
};

const renderTestimonials = (testimonials) => {
	const container = document.getElementById("testimonials-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(testimonials)) return;
	for (const testimonial of testimonials) {
		const blockquote = document.createElement("blockquote");
		blockquote.className =
			"rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm leading-relaxed text-slate-600 shadow-lg shadow-slate-500/5 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300";
		blockquote.textContent = testimonial.quote ?? "";

		const footer = document.createElement("footer");
		footer.className = "mt-4 text-xs uppercase tracking-[0.3em] text-slate-500";
		footer.textContent = testimonial.attribution ?? "";

		blockquote.append(footer);
		container.append(blockquote);
	}
};

const renderContactLinks = (links) => {
	const container = document.getElementById("contact-links");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(links)) return;
	for (const link of links) {
		const anchor = document.createElement("a");
		anchor.href = link.href ?? "#";
		anchor.textContent = link.label ?? "";
		anchor.className =
			link.variant === "primary"
				? "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
				: "inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-100";
		container.append(anchor);
	}
};

const initSiteContent = async () => {
	const content = await loadSiteContent();
	if (!content) return;
	renderProjects(content.projects);
	renderSkills(content.skills);
	renderExperience(content.experience);
	renderTestimonials(content.testimonials);
	renderContactLinks(content.contactLinks);
};

const initGsap = async () => {
	if (prefersReducedMotion) return;

	const config = await loadAnimationConfig();
	if (!config) return;

	if (Array.isArray(config.entryAnimations)) {
		for (const animation of config.entryAnimations) {
			if (!animation?.selector || !animation.from) continue;
			gsap.from(animation.selector, animation.from);
		}
	}

	const scrollConfig = config.scrollAnimation;
	if (scrollConfig?.selector && scrollConfig.from) {
		const sections = gsap.utils.toArray(scrollConfig.selector);
		for (let index = 0; index < sections.length; index += 1) {
			const section = sections[index];
			if (scrollConfig.skipFirst && index === 0) continue;
			const options = JSON.parse(JSON.stringify(scrollConfig.from));
			if (options.scrollTrigger) {
				options.scrollTrigger = { ...options.scrollTrigger, trigger: section };
			} else {
				options.scrollTrigger = { trigger: section };
			}
			gsap.from(section, options);
		}
	}
};

window.addEventListener("load", () => {
	void initGsap();
});

window.addEventListener("DOMContentLoaded", () => {
	void initSiteContent();
});
