import { renderEmptyState } from "../modules/dom-utils.js";

export const renderExperience = (experiences) => {
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
