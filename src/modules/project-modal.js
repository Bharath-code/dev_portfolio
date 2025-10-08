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
const projectModalWalkthroughWrapper = document.getElementById("project-modal-walkthrough-wrapper");
const projectModalWalkthroughTabs = document.getElementById("project-modal-walkthrough-tabs");
const projectModalWalkthroughTitle = document.getElementById("project-modal-walkthrough-title");
const projectModalWalkthroughSummary = document.getElementById("project-modal-walkthrough-summary");
const projectModalWalkthroughMetric = document.getElementById("project-modal-walkthrough-metric");
const projectModalWalkthroughMetricLabel = document.getElementById("project-modal-walkthrough-metric-label");
const projectModalWalkthroughMetricValue = document.getElementById("project-modal-walkthrough-metric-value");
const projectModalWalkthroughCode = document.getElementById("project-modal-walkthrough-code");
const projectModalSandboxWrapper = document.getElementById("project-modal-sandbox-wrapper");
const projectModalSandboxTitle = document.getElementById("project-modal-sandbox-title");
const projectModalSandboxDescription = document.getElementById("project-modal-sandbox-description");
const projectModalSandboxFrame = document.getElementById("project-modal-sandbox-frame");
const projectModalSandboxLink = document.getElementById("project-modal-sandbox-link");

let lastFocusedTrigger = null;
let previousBodyOverflow = "";
let walkthroughSteps = [];
let currentWalkthroughIndex = 0;

const hideWalkthrough = () => {
	if (projectModalWalkthroughWrapper) {
		projectModalWalkthroughWrapper.classList.add("hidden");
	}
	if (projectModalWalkthroughTabs) {
		clearChildren(projectModalWalkthroughTabs);
	}
	if (projectModalWalkthroughTitle) {
		projectModalWalkthroughTitle.textContent = "";
	}
	if (projectModalWalkthroughSummary) {
		projectModalWalkthroughSummary.textContent = "";
	}
	if (projectModalWalkthroughMetric) {
		projectModalWalkthroughMetric.classList.add("hidden");
	}
	if (projectModalWalkthroughMetricLabel) {
		projectModalWalkthroughMetricLabel.textContent = "";
	}
	if (projectModalWalkthroughMetricValue) {
		projectModalWalkthroughMetricValue.textContent = "";
	}
	if (projectModalWalkthroughCode) {
		projectModalWalkthroughCode.textContent = "";
	}
	walkthroughSteps = [];
	currentWalkthroughIndex = 0;
};

const updateWalkthroughActiveState = () => {
	if (!projectModalWalkthroughTabs) return;
	const buttons = projectModalWalkthroughTabs.querySelectorAll("[data-walkthrough-index]");
	for (const button of buttons) {
		const index = Number.parseInt(button.getAttribute("data-walkthrough-index"), 10);
		button.className =
			"inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700";
		if (index === currentWalkthroughIndex) {
			button.classList.add("bg-brand", "text-white", "border-brand");
		} else {
			button.classList.add("text-slate-600", "hover:border-brand", "hover:text-brand", "dark:text-slate-300");
		}
	}
};

const renderWalkthroughStep = (step) => {
	if (!step) return;
	if (projectModalWalkthroughTitle) {
		projectModalWalkthroughTitle.textContent = step.label ?? "Milestone";
	}
	if (projectModalWalkthroughSummary) {
		projectModalWalkthroughSummary.textContent = step.summary ?? "";
	}
	const hasMetric = Boolean(step.metricLabel || step.metricValue);
	if (projectModalWalkthroughMetric) {
		projectModalWalkthroughMetric.classList.toggle("hidden", !hasMetric);
	}
	if (projectModalWalkthroughMetricLabel) {
		projectModalWalkthroughMetricLabel.textContent = step.metricLabel ?? "Impact";
	}
	if (projectModalWalkthroughMetricValue) {
		projectModalWalkthroughMetricValue.textContent = step.metricValue ?? "";
	}
	if (projectModalWalkthroughCode) {
		projectModalWalkthroughCode.textContent = step.code ?? "";
		if (step.language) {
			projectModalWalkthroughCode.setAttribute("data-language", step.language);
		}
		projectModalWalkthroughCode.parentElement?.classList.toggle("hidden", !step.code);
	}
};

const handleWalkthroughTabClick = (event) => {
	const target = event.currentTarget;
	const index = Number.parseInt(target.getAttribute("data-walkthrough-index"), 10);
	if (Number.isNaN(index) || !walkthroughSteps[index]) return;
	currentWalkthroughIndex = index;
	updateWalkthroughActiveState();
	renderWalkthroughStep(walkthroughSteps[index]);
};

const renderWalkthrough = (steps) => {
	if (!projectModalWalkthroughWrapper || !projectModalWalkthroughTabs) return;
	if (!Array.isArray(steps) || steps.length === 0) {
		hideWalkthrough();
		return;
	}
	projectModalWalkthroughWrapper.classList.remove("hidden");
	clearChildren(projectModalWalkthroughTabs);
	walkthroughSteps = steps;
	currentWalkthroughIndex = 0;
	steps.forEach((step, index) => {
		const button = document.createElement("button");
		button.type = "button";
		button.setAttribute("data-walkthrough-index", index.toString());
		button.className =
			"inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-300";
		button.textContent = step.label ?? `Step ${index + 1}`;
		button.addEventListener("click", handleWalkthroughTabClick);
		projectModalWalkthroughTabs.append(button);
	});
	updateWalkthroughActiveState();
	renderWalkthroughStep(steps[0]);
};

const resetSandbox = () => {
	if (projectModalSandboxWrapper) {
		projectModalSandboxWrapper.classList.add("hidden");
	}
	if (projectModalSandboxTitle) {
		projectModalSandboxTitle.textContent = "";
	}
	if (projectModalSandboxDescription) {
		projectModalSandboxDescription.textContent = "";
	}
	if (projectModalSandboxFrame) {
		projectModalSandboxFrame.setAttribute("src", "");
		projectModalSandboxFrame.setAttribute("hidden", "true");
	}
	if (projectModalSandboxLink) {
		projectModalSandboxLink.classList.add("hidden");
		projectModalSandboxLink.setAttribute("href", "#");
	}
};

const renderSandbox = (project, spotlight) => {
	if (!projectModalSandboxWrapper) return;
	const sandbox = spotlight?.sandbox;
	const demoHref = project?.demo?.href ?? sandbox?.src;
	if (!sandbox?.src && !demoHref) {
		resetSandbox();
		return;
	}
	projectModalSandboxWrapper.classList.remove("hidden");
	if (projectModalSandboxTitle) {
		projectModalSandboxTitle.textContent = sandbox?.title ?? "Interactive demo";
	}
	if (projectModalSandboxDescription) {
		projectModalSandboxDescription.textContent = sandbox?.description ?? "Explore the workflow in an embedded sandbox.";
	}
	if (projectModalSandboxFrame) {
		if (sandbox?.src) {
			projectModalSandboxFrame.setAttribute("src", sandbox.src);
			projectModalSandboxFrame.removeAttribute("hidden");
		} else {
			projectModalSandboxFrame.setAttribute("hidden", "true");
		}
	}
	if (projectModalSandboxLink) {
		if (demoHref) {
			projectModalSandboxLink.classList.remove("hidden");
			projectModalSandboxLink.href = demoHref;
			projectModalSandboxLink.setAttribute(
				"aria-label",
				`Open demo for ${project?.title ?? spotlight?.headline ?? "project"} in a new tab`,
			);
		} else {
			projectModalSandboxLink.classList.add("hidden");
		}
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
	hideWalkthrough();
	resetSandbox();
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

	renderWalkthrough(Array.isArray(spotlight.walkthrough) ? spotlight.walkthrough : []);
	renderSandbox(project, spotlight);

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
