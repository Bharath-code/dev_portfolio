import { createTag, renderEmptyState } from "../modules/dom-utils.js";

export const renderSkills = (skills) => {
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
