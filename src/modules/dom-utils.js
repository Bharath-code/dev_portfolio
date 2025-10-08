export const createTag = (label) => {
	const span = document.createElement("span");
	span.className =
		"rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand";
	span.textContent = label;
	return span;
};

export const renderEmptyState = (container, message) => {
	if (!container) return;
	const item = document.createElement("li");
	item.className =
		"rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400";
	item.textContent = message;
	container.append(item);
};

export const clearChildren = (node) => {
	if (!node) return;
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};
