import animationConfig from "./data/animations.json";
import siteContent from "./data/site-content.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;

const themeToggleButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon path");

const projectModal = document.getElementById("project-modal");
const projectModalMeta = document.getElementById("project-modal-meta");
const projectModalBadge = document.getElementById("project-modal-badge");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalOverview = document.getElementById("project-modal-overview");
const projectModalRoles = document.getElementById("project-modal-roles");
const projectModalHighlights = document.getElementById("project-modal-highlights");
const projectModalOutcomes = document.getElementById("project-modal-outcomes");
const projectModalCloseButton = document.getElementById("project-modal-close");
const projectModalOverlay = projectModal?.querySelector("[data-modal-overlay]");
const projectModalContent = document.getElementById("project-modal-content");
let lastFocusedTrigger = null;
let previousBodyOverflow = "";

const testimonialFilters = document.getElementById("testimonial-filters");
const testimonialBadge = document.getElementById("testimonial-badge");
const testimonialQuote = document.getElementById("testimonial-quote");
const testimonialAttribution = document.getElementById("testimonial-attribution");
const testimonialRole = document.getElementById("testimonial-role");
const testimonialPrev = document.getElementById("testimonial-prev");
const testimonialNext = document.getElementById("testimonial-next");
const testimonialPagination = document.getElementById("testimonial-pagination");

const TESTIMONIAL_BADGE_COLOR_CLASSES = {
	"bg-indigo-500": "bg-indigo-500",
	"bg-emerald-500": "bg-emerald-500",
	"bg-amber-500": "bg-amber-500",
};

const testimonialState = {
	items: [],
	filter: "all",
	index: 0,
};

const baseTestimonialBadgeClass =
	"flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white shadow-lg shadow-brand/20";
const baseFilterClass =
	"inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-300";
const activeFilterClass = "bg-brand text-white border-brand";

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

const createTag = (label) => {
	const span = document.createElement("span");
	span.className =
		"rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand";
	span.textContent = label;
	return span;
};

const renderEmptyState = (container, message) => {
	const item = document.createElement("li");
	item.className = "rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400";
	item.textContent = message;
	container.append(item);
};

const renderProjects = (projects) => {
	const container = document.getElementById("projects-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(projects) || projects.length === 0) {
		renderEmptyState(container, "Project case studies are coming soon.");
		return;
	}
	for (const project of projects) {
		const item = document.createElement("li");
		item.className = "h-full";
		const article = document.createElement("article");
		article.className =
			"group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/20 dark:border-slate-800 dark:bg-slate-900/80";

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

		const actions = document.createElement("div");
		actions.className = "mt-6 flex items-center justify-start";
		const moreDetails = document.createElement("button");
		moreDetails.type = "button";
		moreDetails.className =
			"inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-200";
		moreDetails.textContent = "View case study";
		moreDetails.setAttribute("aria-label", `View case study for ${project.title ?? "project"}`);
		moreDetails.addEventListener("click", () => {
			lastFocusedTrigger = moreDetails;
			openProjectModal(project);
		});
		actions.append(moreDetails);

		article.append(metaRow, title, description, tagsWrapper, actions);
		item.append(article);
		container.append(item);
	}
};

const renderSkills = (skills) => {
	const container = document.getElementById("skills-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(skills) || skills.length === 0) {
		renderEmptyState(container, "Skill highlights will be added shortly.");
		return;
	}
	for (const skill of skills) {
		const item = document.createElement("li");
		item.className = "h-full";
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
		item.append(card);
		container.append(item);
	}
};

const renderServices = (services) => {
	const container = document.getElementById("services-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(services) || services.length === 0) {
		renderEmptyState(container, "Service offerings will be added shortly.");
		return;
	}
	for (const service of services) {
		const item = document.createElement("li");
		item.className = "h-full";
		const card = document.createElement("article");
		card.className =
			"flex h-full flex-col gap-5 rounded-3xl border border-slate-200 bg-white/80 p-6 text-left transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 dark:border-slate-800 dark:bg-slate-900/80";

		const header = document.createElement("div");
		header.className = "space-y-3";
		const title = document.createElement("h3");
		title.className = "text-xl font-semibold";
		title.textContent = service.title ?? "";
		const description = document.createElement("p");
		description.className = "text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		description.textContent = service.description ?? "";
		header.append(title, description);

		const highlights = document.createElement("ul");
		highlights.className = "space-y-2";
		for (const highlight of service.highlights ?? []) {
			const highlightItem = document.createElement("li");
			highlightItem.className = "flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300";
			const bullet = document.createElement("span");
			bullet.className = "h-1.5 w-1.5 rounded-full bg-brand";
			highlightItem.append(bullet, document.createTextNode(highlight));
			highlights.append(highlightItem);
		}

		const metric = document.createElement("p");
		metric.className = "mt-4 text-sm font-semibold text-brand";
		metric.textContent = service.metric ?? "";

		card.append(header, highlights, metric);
		item.append(card);
		container.append(item);
	}
};

const renderWorkingStyle = (steps) => {
	const container = document.getElementById("working-style-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(steps) || steps.length === 0) {
		renderEmptyState(container, "Working style details are coming soon.");
		return;
	}
	steps.forEach((step, index) => {
		const item = document.createElement("li");
		item.className =
			"relative flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 pl-10 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10 dark:border-slate-800 dark:bg-slate-900/80";

		const timelineBar = document.createElement("span");
		timelineBar.className = "absolute left-5 top-6 w-px bg-brand/30";
		timelineBar.style.height = index === steps.length - 1 ? "2.5rem" : "100%";
		if (index === steps.length - 1) {
			timelineBar.style.display = "none";
		}
		const timelineDot = document.createElement("span");
		timelineDot.className = "absolute left-4 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/30";
		item.append(timelineBar, timelineDot);
		if (index === steps.length - 1) {
			timelineBar.style.height = "2.5rem";
		}

		const header = document.createElement("div");
		header.className = "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between";
		const phase = document.createElement("h3");
		phase.className = "text-xl font-semibold";
		phase.textContent = step.phase ?? "";
		const tag = document.createElement("span");
		tag.className = "inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand";
		tag.textContent = step.tag ?? "";
		header.append(phase, tag);

		const summary = document.createElement("p");
		summary.className = "text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		summary.textContent = step.summary ?? "";

		const detailList = document.createElement("ul");
		detailList.className = "list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300";
		for (const detail of step.details ?? []) {
			const detailItem = document.createElement("li");
			detailItem.textContent = detail;
			detailList.append(detailItem);
		}

		item.append(header, summary, detailList);
		container.append(item);
	});
};

const renderExperience = (experiences) => {
	const container = document.getElementById("experience-list");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(experiences) || experiences.length === 0) {
		renderEmptyState(container, "Experience details will be available soon.");
		return;
	}
	for (const experience of experiences) {
		const item = document.createElement("li");
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
		item.append(article);
		container.append(item);
	}
};

const normalizeFilterValue = (value) =>
	value?.toString().trim().toLowerCase() ?? "";

const getFilteredTestimonials = () => {
	if (testimonialState.filter === "all") {
		return testimonialState.items;
	}
	return testimonialState.items.filter(
		(item) => normalizeFilterValue(item?.category) === testimonialState.filter,
	);
};

const updateFilterButtonStates = () => {
	if (!testimonialFilters) return;
	const buttons = testimonialFilters.querySelectorAll("[data-filter]");
	for (const button of buttons) {
		const value = button.getAttribute("data-filter");
		button.className = baseFilterClass;
		if (value === testimonialState.filter) {
			button.classList.add(...activeFilterClass.split(" "));
		}
		button.setAttribute(
			"aria-selected",
			value === testimonialState.filter ? "true" : "false",
		);
		button.setAttribute("tabindex", value === testimonialState.filter ? "0" : "-1");
	}
};

const buildTestimonialFilters = (categories) => {
	if (!testimonialFilters) return;
	testimonialFilters.innerHTML = "";
	const normalizedCategories = categories.map((category, index) => ({
		label: category,
		value: normalizeFilterValue(category) || `group-${index}`,
	}));
	const filters = [{ label: "All", value: "all" }, ...normalizedCategories];

	for (const { label, value } of filters) {
		const button = document.createElement("button");
		button.type = "button";
		button.dataset.filter = value;
		button.className = baseFilterClass;
		button.textContent = label;
		button.role = "tab";
		button.setAttribute("aria-selected", value === testimonialState.filter ? "true" : "false");
		button.setAttribute("tabindex", value === testimonialState.filter ? "0" : "-1");
		button.addEventListener("click", () => {
			if (testimonialState.filter === value) return;
			testimonialState.filter = value;
			testimonialState.index = 0;
			updateFilterButtonStates();
			updateTestimonialView();
		});
		testimonialFilters.append(button);
	}
	updateFilterButtonStates();
};

const setTestimonialEmptyView = () => {
	if (!testimonialQuote || !testimonialBadge || !testimonialAttribution || !testimonialRole) {
		return;
	}
	testimonialQuote.textContent = "Testimonials are on their way.";
	testimonialAttribution.textContent = "";
	testimonialRole.textContent = "";
	testimonialBadge.className = `${baseTestimonialBadgeClass} bg-slate-500 opacity-0`;
	if (testimonialPrev) {
		testimonialPrev.disabled = true;
	}
	if (testimonialNext) {
		testimonialNext.disabled = true;
	}
	if (testimonialPagination) {
		testimonialPagination.innerHTML = "";
	}
};

const updateTestimonialPagination = (length) => {
	if (!testimonialPagination) return;
	testimonialPagination.innerHTML = "";
	if (length <= 1) return;
	for (let index = 0; index < length; index += 1) {
		const dot = document.createElement("span");
		dot.className =
			index === testimonialState.index
				? "h-2 w-6 rounded-full bg-brand transition-all"
				: "h-2 w-2 rounded-full bg-slate-300 transition-all dark:bg-slate-700";
		dot.setAttribute("aria-hidden", "true");
		testimonialPagination.append(dot);
	}
};

const updateTestimonialView = () => {
	const filtered = getFilteredTestimonials();
	if (!filtered.length) {
		setTestimonialEmptyView();
		return;
	}
	if (testimonialState.index >= filtered.length) {
		testimonialState.index = 0;
	}
	const current = filtered[testimonialState.index];
	if (!current) {
		setTestimonialEmptyView();
		return;
	}

	if (testimonialPrev) {
		testimonialPrev.disabled = filtered.length <= 1;
	}
	if (testimonialNext) {
		testimonialNext.disabled = filtered.length <= 1;
	}

	if (testimonialBadge) {
		const colorClass = TESTIMONIAL_BADGE_COLOR_CLASSES[current.badgeColor] ?? "bg-slate-500";
		testimonialBadge.className = `${baseTestimonialBadgeClass} ${colorClass}`;
		testimonialBadge.style.opacity = "1";
		testimonialBadge.textContent = (current.badge ?? current.company ?? "?")
			.toString()
			.slice(0, 3)
			.toUpperCase();
	}
	if (testimonialQuote) {
		testimonialQuote.textContent = current.quote ?? "";
	}
	if (testimonialAttribution) {
		testimonialAttribution.textContent = current.attribution ?? "";
	}
	if (testimonialRole) {
		const roleParts = [current.role, current.company].filter(Boolean);
		testimonialRole.textContent = roleParts.join(" · ");
	}

	updateTestimonialPagination(filtered.length);

	if (testimonialFilters) {
		const buttons = testimonialFilters.querySelectorAll("[data-filter]");
		for (const button of buttons) {
			const value = button.getAttribute("data-filter");
			const isActive = value === testimonialState.filter;
			button.setAttribute("aria-selected", isActive ? "true" : "false");
		}
	}
};

const initTestimonials = (testimonials) => {
	if (!Array.isArray(testimonials) || testimonials.length === 0) {
		testimonialState.items = [];
		buildTestimonialFilters([]);
		setTestimonialEmptyView();
		return;
	}
	testimonialState.items = testimonials;
	testimonialState.filter = "all";
	testimonialState.index = 0;
	const categories = Array.from(
		new Set(
			testimonials
				.map((testimonial) => testimonial?.category)
				.filter((category) => typeof category === "string" && category.trim().length > 0),
			),
	);
	buildTestimonialFilters(categories);
	updateTestimonialView();
};

const cycleTestimonial = (direction) => {
	const filtered = getFilteredTestimonials();
	if (!filtered.length) return;
	const nextIndex = testimonialState.index + direction;
	const lastIndex = filtered.length - 1;
	if (nextIndex < 0) {
		testimonialState.index = lastIndex;
	} else if (nextIndex > lastIndex) {
		testimonialState.index = 0;
	} else {
		testimonialState.index = nextIndex;
	}
	updateTestimonialView();
};

const handleTestimonialPrev = () => {
	cycleTestimonial(-1);
};

const handleTestimonialNext = () => {
	cycleTestimonial(1);
};

testimonialPrev?.addEventListener("click", handleTestimonialPrev);
testimonialNext?.addEventListener("click", handleTestimonialNext);

const renderContactLinks = (links) => {
	const container = document.getElementById("contact-links");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(links) || links.length === 0) {
		renderEmptyState(container, "Contact options will appear here soon.");
		return;
	}
	for (const link of links) {
		const item = document.createElement("li");
		item.className = "inline-flex";
		const anchor = document.createElement("a");
		anchor.href = link.href ?? "#";
		anchor.textContent = link.label ?? "";
		anchor.className =
			link.variant === "primary"
				? "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
				: "inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-100";
		item.append(anchor);
		container.append(item);
	}
};

const clearChildren = (node) => {
	if (!node) return;
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};

const handleProjectModalKeydown = (event) => {
	if (event.key === "Escape") {
		event.preventDefault();
		closeProjectModal();
		return;
	}
	if (event.key !== "Tab" || !projectModal) return;
	const focusableSelectors =
		'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
	const focusable = projectModal.querySelectorAll(focusableSelectors);
	if (!focusable.length) return;
	const first = focusable[0];
	const last = focusable[focusable.length - 1];
	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
};

const closeProjectModal = () => {
	if (!projectModal) return;
	projectModal.classList.add("hidden");
	document.removeEventListener("keydown", handleProjectModalKeydown, true);
	if (projectModalContent) {
		projectModalContent.scrollTop = 0;
	}
	if (typeof previousBodyOverflow === "string") {
		document.body.style.overflow = previousBodyOverflow;
	}
	previousBodyOverflow = "";
	if (lastFocusedTrigger instanceof HTMLElement) {
		lastFocusedTrigger.focus();
	}
	lastFocusedTrigger = null;
};

const openProjectModal = (project) => {
	if (!projectModal) return;
	const spotlight = project?.spotlight ?? {};
	previousBodyOverflow = document.body.style.overflow;
	document.body.style.overflow = "hidden";
	projectModal.classList.remove("hidden");

	if (projectModalMeta) {
		projectModalMeta.textContent = project?.meta ?? "";
		projectModalMeta.classList.toggle("hidden", !project?.meta);
	}
	if (projectModalBadge) {
		projectModalBadge.textContent = project?.badge ?? "";
		projectModalBadge.classList.toggle("hidden", !project?.badge);
	}
	if (projectModalTitle) {
		projectModalTitle.textContent = project?.title ?? spotlight.headline ?? "Project spotlight";
	}
	if (projectModalOverview) {
		const overviewText = (() => {
			if (spotlight.overview) return spotlight.overview;
			if (project?.description) return project.description;
			if (project?.descriptionHtml) {
				const temp = document.createElement("div");
				temp.innerHTML = project.descriptionHtml;
				return temp.textContent ?? temp.innerText ?? "";
			}
			return "Detailed write-up coming soon.";
		})();
		projectModalOverview.textContent = overviewText;
	}

	clearChildren(projectModalRoles);
	if (Array.isArray(spotlight.roles) && spotlight.roles.length) {
		for (const role of spotlight.roles) {
			projectModalRoles?.append(createTag(role));
		}
	} else {
		const fallback = document.createElement("span");
		fallback.className =
			"rounded-full bg-slate-200/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:bg-slate-800/60 dark:text-slate-300";
		fallback.textContent = "Hands-on partner";
		projectModalRoles?.append(fallback);
	}

	clearChildren(projectModalHighlights);
	if (Array.isArray(spotlight.highlights) && spotlight.highlights.length) {
		for (const highlight of spotlight.highlights) {
			const item = document.createElement("li");
			item.className = "leading-relaxed text-slate-600 dark:text-slate-300";
			item.textContent = highlight;
			projectModalHighlights?.append(item);
		}
	} else {
		const item = document.createElement("li");
		item.className = "leading-relaxed text-slate-600 dark:text-slate-300";
		item.textContent = "Highlights coming soon.";
		projectModalHighlights?.append(item);
	}

	clearChildren(projectModalOutcomes);
	if (Array.isArray(spotlight.outcomes) && spotlight.outcomes.length) {
		for (const outcome of spotlight.outcomes) {
			const outcomeItem = document.createElement("li");
			outcomeItem.className =
				"rounded-2xl border border-slate-200 bg-white/90 p-4 text-left text-sm text-slate-700 shadow-sm transition dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-200";
			const label = document.createElement("p");
			label.className = "text-xs uppercase tracking-[0.3em] text-slate-500";
			label.textContent = outcome?.label ?? "Outcome";
			const value = document.createElement("p");
			value.className = "mt-2 text-lg font-semibold text-brand";
			value.textContent = outcome?.value ?? "—";
			outcomeItem.append(label, value);
			projectModalOutcomes?.append(outcomeItem);
		}
	} else {
		const fallback = document.createElement("li");
		fallback.className =
			"rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-300";
		fallback.textContent = "Outcomes to be published soon.";
		projectModalOutcomes?.append(fallback);
	}

	if (projectModalContent) {
		projectModalContent.scrollTop = 0;
	}
	if (projectModalCloseButton) {
		projectModalCloseButton.focus();
	} else if (projectModalContent) {
		projectModalContent.focus();
	}
	document.addEventListener("keydown", handleProjectModalKeydown, true);
};

const initProjectModal = () => {
	if (!projectModal) return;
	projectModalCloseButton?.addEventListener("click", () => {
		closeProjectModal();
	});
	projectModalOverlay?.addEventListener("click", () => {
		closeProjectModal();
	});
};

const initSiteContent = () => {
	const content = siteContent ?? {};
	renderProjects(content.projects);
	renderServices(content.services);
	renderSkills(content.skills);
	renderExperience(content.experience);
	renderWorkingStyle(content.workingStyle);
	initTestimonials(content.testimonials);
	renderContactLinks(content.contactLinks);
};

const initGsap = () => {
	if (prefersReducedMotion) return;

	const config = animationConfig;
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
	initSiteContent();
	initProjectModal();
	const navLinks = document.querySelectorAll("[data-nav-link]");
	const sections = document.querySelectorAll("section[id]");
	if (navLinks.length && sections.length) {
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
	}
});
