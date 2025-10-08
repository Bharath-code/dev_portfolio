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

let listenersBound = false;

const normalizeFilterValue = (value) => value?.toString().trim().toLowerCase() ?? "";

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

export const initTestimonials = (testimonials) => {
	if (!listenersBound) {
		testimonialPrev?.addEventListener("click", handleTestimonialPrev);
		testimonialNext?.addEventListener("click", handleTestimonialNext);
		listenersBound = true;
	}
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
