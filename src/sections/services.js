import { renderEmptyState } from "../modules/dom-utils.js";

export const renderServices = (services) => {
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
			highlightItem.className =
				"flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300";
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
