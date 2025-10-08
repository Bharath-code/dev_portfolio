import { renderEmptyState } from "../modules/dom-utils.js";

const buildTag = (label) => {
	const span = document.createElement("span");
	span.className =
		"inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand";
	span.textContent = label ?? "";
	return span;
};

export const renderSignalHighlights = (signals) => {
	const container = document.getElementById("signal-featured");
	if (!container) return;
	container.innerHTML = "";
	const featured = Array.isArray(signals?.featured) ? signals.featured : [];
	if (!featured.length) {
		renderEmptyState(
			container,
			"Public highlights and endorsements will appear here once published.",
		);
		return;
	}
	for (const item of featured) {
		const card = document.createElement("li");
		card.className =
			"rounded-3xl border border-slate-200 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-brand hover:shadow-2xl hover:shadow-brand/20 dark:border-slate-800 dark:bg-slate-900/80";
		const header = document.createElement("div");
		header.className = "flex items-center justify-between gap-3";
		const title = document.createElement("h3");
		title.className = "text-lg font-semibold text-slate-900 dark:text-white";
		title.textContent = item.title ?? "";
		header.append(title);
		if (item.tag) {
			header.append(buildTag(item.tag));
		}
		const description = document.createElement("p");
		description.className = "mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300";
		description.textContent = item.description ?? "";
		card.append(header, description);
		if (item.link) {
			const link = document.createElement("a");
			link.href = item.link;
			link.target = "_blank";
			link.rel = "noreferrer noopener";
			link.className =
				"mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3";
			link.textContent = "See proof";
			const icon = document.createElement("span");
			icon.setAttribute("aria-hidden", "true");
			icon.textContent = "→";
			link.append(icon);
			card.append(link);
		}
		container.append(card);
	}
};

export const renderWritingHighlights = (signals) => {
	const container = document.getElementById("signal-writing");
	if (!container) return;
	container.innerHTML = "";
	const writing = Array.isArray(signals?.writing) ? signals.writing : [];
	if (!writing.length) {
		renderEmptyState(container, "Long-form thinking drops here soon.");
		return;
	}
	for (const entry of writing) {
		const item = document.createElement("li");
		item.className =
			"flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/70";
		const link = document.createElement("a");
		link.href = entry.link ?? "#";
		link.target = "_blank";
		link.rel = "noreferrer noopener";
		link.className = "font-semibold text-slate-900 transition hover:text-brand dark:text-white";
		link.textContent = entry.title ?? "Untitled";
		const meta = document.createElement("span");
		meta.className = "text-xs uppercase tracking-[0.3em] text-slate-500";
		meta.textContent = entry.published ?? "";
		item.append(link, meta);
		container.append(item);
	}
};
