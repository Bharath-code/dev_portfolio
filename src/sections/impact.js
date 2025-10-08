import { renderEmptyState } from "../modules/dom-utils.js";

export const renderImpact = (highlights) => {
	const container = document.getElementById("impact-metrics");
	if (!container) return;
	container.innerHTML = "";
	if (!Array.isArray(highlights) || highlights.length === 0) {
		renderEmptyState(
			container,
			"Impact metrics are being gathered. Check back soon for the latest results.",
		);
		return;
	}
	for (const highlight of highlights) {
		const item = document.createElement("li");
		item.className =
			"rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/20 dark:border-slate-800 dark:bg-slate-900/80";
		const value = document.createElement("p");
		value.className = "text-3xl font-semibold text-slate-900 dark:text-white";
		value.textContent = highlight.value ?? "";
		const label = document.createElement("p");
		label.className = "mt-2 text-xs uppercase tracking-[0.3em] text-brand";
		label.textContent = highlight.label ?? "";
		const description = document.createElement("p");
		description.className = "mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		description.textContent = highlight.description ?? "";
		item.append(value, label, description);
		container.append(item);
	}
};
