import { createTag, renderEmptyState } from "../modules/dom-utils.js";
import { openProjectModal } from "../modules/project-modal.js";

export const renderProjects = (projects) => {
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
		actions.className = "mt-6 flex flex-wrap items-center gap-3";
		const moreDetails = document.createElement("button");
		moreDetails.type = "button";
		moreDetails.className =
			"inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-200";
		moreDetails.textContent = "View case study";
		moreDetails.setAttribute(
			"aria-label",
			`View case study for ${project.title ?? "project"}`,
		);
		moreDetails.addEventListener("click", () => {
			openProjectModal(project, moreDetails);
		});
		actions.append(moreDetails);
		if (project.demo?.href) {
			const demoLink = document.createElement("a");
			demoLink.href = project.demo.href;
			demoLink.target = "_blank";
			demoLink.rel = "noreferrer noopener";
			demoLink.className =
				"inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand transition hover:bg-brand/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
			demoLink.textContent = project.demo.label ?? "Live demo";
			demoLink.setAttribute("aria-label", `Open live demo for ${project.title ?? "project"}`);
			actions.append(demoLink);
		}

		article.append(metaRow, title, description, tagsWrapper, actions);
		item.append(article);
		container.append(item);
	}
};
