import { renderEmptyState } from "../modules/dom-utils.js";

export const renderRecruiterCta = (cta) => {
	const container = document.getElementById("recruiter-cta");
	if (!container) return;
	container.innerHTML = "";
	if (!cta) {
		renderEmptyState(container, "Recruiter fast-track details coming soon.");
		return;
	}
	const card = document.createElement("div");
	card.className =
		"grid gap-6 rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-lg shadow-brand/10 dark:border-slate-800 dark:bg-slate-900/85 md:grid-cols-[0.7fr_0.3fr]";
	const content = document.createElement("div");
	content.className = "space-y-5";
	const headline = document.createElement("h3");
	headline.className = "text-2xl font-semibold text-slate-900 dark:text-white";
	headline.textContent = cta.headline ?? "Fast-track your hiring decision";
	const subheading = document.createElement("p");
	subheading.className = "text-sm leading-relaxed text-slate-600 dark:text-slate-300";
	subheading.textContent = cta.subheading ?? "Book time to see how I deliver outcomes.";
	const list = document.createElement("ul");
	list.className = "space-y-3 text-sm text-slate-600 dark:text-slate-300";
	for (const bullet of cta.bullets ?? []) {
		const item = document.createElement("li");
		item.className = "flex items-start gap-3";
		const dot = document.createElement("span");
		dot.className = "mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-brand";
		const text = document.createElement("p");
		text.textContent = bullet ?? "";
		item.append(dot, text);
		list.append(item);
	}
	const actions = document.createElement("div");
	actions.className = "flex flex-wrap gap-3";
	if (cta.calUrl) {
		const primary = document.createElement("a");
		primary.href = cta.calUrl;
		primary.target = "_blank";
		primary.rel = "noreferrer noopener";
		primary.className =
			"inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
		primary.textContent = "Book 20-min hiring chat";
		actions.append(primary);
	}
	if (cta.resumeUrl) {
		const secondary = document.createElement("a");
		secondary.href = cta.resumeUrl;
		secondary.target = "_blank";
		secondary.rel = "noreferrer noopener";
		secondary.className =
			"inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-slate-700 dark:text-slate-100";
		secondary.textContent = "Download one-page resume";
		actions.append(secondary);
	}
	if (cta.email) {
		const tertiary = document.createElement("a");
		tertiary.href = cta.email;
		tertiary.className = "inline-flex items-center text-sm font-semibold text-brand transition hover:gap-1.5";
		tertiary.textContent = "Or send a brief";
		actions.append(tertiary);
	}
	content.append(headline, subheading, list, actions);
	const aside = document.createElement("div");
	aside.className =
		"rounded-3xl border border-dashed border-brand/40 bg-brand/5 p-5 text-sm text-slate-700 dark:text-slate-300";
	const asideTitle = document.createElement("p");
	asideTitle.className = "text-xs uppercase tracking-[0.3em] text-brand";
	asideTitle.textContent = "What you leave with";
	const asideList = document.createElement("ul");
	asideList.className = "mt-3 space-y-3";
	const deliverables = [
		"Custom 90-day impact plan",
		"Scorecard tailored to your org",
		"One-page resume PDF",
	];
	for (const item of deliverables) {
		const li = document.createElement("li");
		li.className = "flex items-start gap-2";
		const marker = document.createElement("span");
		marker.className = "mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-brand";
		const text = document.createElement("span");
		text.textContent = item;
		li.append(marker, text);
		asideList.append(li);
	}
	aside.append(asideTitle, asideList);
	card.append(content, aside);
	container.append(card);
};
