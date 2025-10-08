import { clearChildren, createTag } from "./dom-utils.js";

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

export const closeProjectModal = () => {
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

export const openProjectModal = (project, trigger) => {
	if (!projectModal) return;
	if (trigger instanceof HTMLElement) {
		lastFocusedTrigger = trigger;
	}
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

export const initProjectModal = () => {
	if (!projectModal) return;
	projectModalCloseButton?.addEventListener("click", () => {
		closeProjectModal();
	});
	projectModalOverlay?.addEventListener("click", () => {
		closeProjectModal();
	});
};
