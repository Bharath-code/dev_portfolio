const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_SCORE = 5;

const toRadians = (index, total) => (Math.PI * 2 * index) / total - Math.PI / 2;

const buildPolygonPoints = (values, total, radius, center) =>
	values
		.map((value, index) => {
			const clamped = Math.max(0, Math.min(value, MAX_SCORE));
			const ratio = clamped / MAX_SCORE;
			const angle = toRadians(index, total);
			const x = center + Math.cos(angle) * radius * ratio;
			const y = center + Math.sin(angle) * radius * ratio;
			return `${x},${y}`;
		})
		.join(" ");

const appendGrid = (svg, total, radius, center) => {
	const levels = 4;
	for (let level = 1; level <= levels; level += 1) {
		const ratio = level / levels;
		const points = buildPolygonPoints(
			Array.from({ length: total }, () => MAX_SCORE * ratio),
			total,
			radius,
			center,
		);
		const polygon = document.createElementNS(SVG_NS, "polygon");
		polygon.setAttribute("points", points);
		polygon.setAttribute("fill", "none");
		polygon.setAttribute("stroke", "rgba(100,116,139,0.25)");
		polygon.setAttribute("stroke-width", "1");
		svg.append(polygon);
	}
};

const appendAxes = (svg, areas, radius, center) => {
	areas.forEach((_, index) => {
		const angle = toRadians(index, areas.length);
		const x = center + Math.cos(angle) * radius;
		const y = center + Math.sin(angle) * radius;
		const line = document.createElementNS(SVG_NS, "line");
		line.setAttribute("x1", `${center}`);
		line.setAttribute("y1", `${center}`);
		line.setAttribute("x2", `${x}`);
		line.setAttribute("y2", `${y}`);
		line.setAttribute("stroke", "rgba(100,116,139,0.2)");
		svg.append(line);
	});
};

const appendLabels = (svg, areas, radius, center) => {
	areas.forEach((area, index) => {
		const angle = toRadians(index, areas.length);
		const labelRadius = radius + 26;
		const x = center + Math.cos(angle) * labelRadius;
		const y = center + Math.sin(angle) * labelRadius;
		const text = document.createElementNS(SVG_NS, "text");
		text.textContent = (area.label ?? "").toUpperCase();
		text.setAttribute("x", `${x}`);
		text.setAttribute("y", `${y}`);
		text.setAttribute("fill", "#475569");
		text.setAttribute("font-size", "11");
		text.setAttribute("font-weight", "600");
		text.setAttribute("letter-spacing", "0.3em");
		text.setAttribute("text-anchor", Math.cos(angle) > 0.4 ? "start" : Math.cos(angle) < -0.4 ? "end" : "middle");
		text.setAttribute("dominant-baseline", Math.sin(angle) > 0.5 ? "hanging" : Math.sin(angle) < -0.5 ? "baseline" : "middle");
		svg.append(text);
	});
};

const buildRadarSvg = (areas) => {
	const size = 360;
	const center = size / 2;
	const radius = center - 70;
	const svg = document.createElementNS(SVG_NS, "svg");
	svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
	svg.setAttribute("class", "w-full max-w-[340px]");
	appendGrid(svg, areas.length, radius, center);
	appendAxes(svg, areas, radius, center);
	const currentValues = areas.map((area) => area.current ?? 0);
	const targetValues = areas.map((area) => area.target ?? MAX_SCORE);
	const targetPolygon = document.createElementNS(SVG_NS, "polygon");
	targetPolygon.setAttribute(
		"points",
		buildPolygonPoints(targetValues, areas.length, radius, center),
	);
	targetPolygon.setAttribute("fill", "rgba(56,189,248,0.08)");
	targetPolygon.setAttribute("stroke", "rgba(56,189,248,0.4)");
	targetPolygon.setAttribute("stroke-dasharray", "6 6");
	targetPolygon.setAttribute("stroke-width", "1.5");
	svg.append(targetPolygon);
	const currentPolygon = document.createElementNS(SVG_NS, "polygon");
	currentPolygon.setAttribute(
		"points",
		buildPolygonPoints(currentValues, areas.length, radius, center),
	);
	currentPolygon.setAttribute("fill", "rgba(59,130,246,0.2)");
	currentPolygon.setAttribute("stroke", "rgba(59,130,246,0.75)");
	currentPolygon.setAttribute("stroke-width", "2");
	svg.append(currentPolygon);
	appendLabels(svg, areas, radius, center);
	return svg;
};

export const renderSkillRadar = (matrix) => {
	const container = document.getElementById("skill-radar");
	if (!container) return;
	container.innerHTML = "";
	const areas = Array.isArray(matrix?.areas) ? matrix.areas : [];
	if (!areas.length) {
		const message = document.createElement("p");
		message.className = "text-sm text-slate-600 dark:text-slate-300";
		message.textContent = "Skill radar coming soon.";
		container.append(message);
		return;
	}
	const card = document.createElement("div");
	card.className =
		"grid gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 md:grid-cols-[0.65fr_0.35fr] dark:border-slate-800 dark:bg-slate-900/80";
	const chartWrapper = document.createElement("div");
	chartWrapper.className = "flex flex-col items-center justify-center gap-4";
	const svg = buildRadarSvg(areas);
	chartWrapper.append(svg);
	if (matrix?.note) {
		const note = document.createElement("p");
		note.className = "text-center text-xs uppercase tracking-[0.3em] text-slate-500";
		note.textContent = matrix.note;
		chartWrapper.append(note);
	}
	const focusWrapper = document.createElement("div");
	focusWrapper.className = "space-y-4";
	const heading = document.createElement("h3");
	heading.className = "text-base font-semibold text-slate-900 dark:text-white";
	heading.textContent = "Active growth focus";
	const list = document.createElement("ul");
	list.className = "space-y-3 text-sm text-slate-600 dark:text-slate-300";
	for (const area of areas) {
		const item = document.createElement("li");
		const label = document.createElement("p");
		label.className = "font-semibold text-slate-900 dark:text-white";
		label.textContent = `${area.label ?? ""} · ${area.current ?? 0}/5`;
		const focus = document.createElement("p");
		focus.className = "mt-1 text-sm text-slate-600 dark:text-slate-300";
		focus.textContent = area.focus ?? "";
		item.append(label, focus);
		list.append(item);
	}
	focusWrapper.append(heading, list);
	card.append(chartWrapper, focusWrapper);
	container.append(card);
};
