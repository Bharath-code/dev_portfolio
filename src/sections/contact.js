import { renderEmptyState } from "../modules/dom-utils.js";

export const renderContactLinks = (links) => {
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
