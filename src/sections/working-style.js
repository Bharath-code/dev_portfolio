import { renderEmptyState } from "../modules/dom-utils.js";

export const renderWorkingStyle = (steps) => {
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
		timelineDot.className =
			"absolute left-4 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/30";
		item.append(timelineBar, timelineDot);
		if (index === steps.length - 1) {
			timelineBar.style.height = "2.5rem";
		}

		const header = document.createElement("div");
		header.className =
			"flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between";
		const phase = document.createElement("h3");
		phase.className = "text-xl font-semibold";
		phase.textContent = step.phase ?? "";
		const tag = document.createElement("span");
		tag.className =
			"inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand";
		tag.textContent = step.tag ?? "";
		header.append(phase, tag);

		const summary = document.createElement("p");
		summary.className = "text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		summary.textContent = step.summary ?? "";

		const detailList = document.createElement("ul");
		detailList.className =
			"list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300";
		for (const detail of step.details ?? []) {
			const detailItem = document.createElement("li");
			detailItem.textContent = detail;
			detailList.append(detailItem);
		}

		item.append(header, summary, detailList);
		container.append(item);
	});
};
