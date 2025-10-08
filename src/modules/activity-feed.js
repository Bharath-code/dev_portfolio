const MAX_ITEMS = 5;

const formatRelativeTime = (timestamp) => {
	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) return "";
	const diff = date.getTime() - Date.now();
	const units = [
		{ name: "year", ms: 1000 * 60 * 60 * 24 * 365 },
		{ name: "month", ms: 1000 * 60 * 60 * 24 * 30 },
		{ name: "week", ms: 1000 * 60 * 60 * 24 * 7 },
		{ name: "day", ms: 1000 * 60 * 60 * 24 },
		{ name: "hour", ms: 1000 * 60 * 60 },
		{ name: "minute", ms: 1000 * 60 },
	];
	const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
	for (const unit of units) {
		const value = diff / unit.ms;
		if (Math.abs(value) >= 1) {
			return formatter.format(Math.round(value), unit.name);
		}
	}
	return "just now";
};

const parsePushEvent = (event) => {
	const repo = event.repo?.name;
	const commits = Array.isArray(event.payload?.commits) ? event.payload.commits : [];
	if (!repo || !commits.length) return null;
	const lastCommit = commits[commits.length - 1];
	const message = lastCommit?.message?.split("\n")[0] ?? "Updated repository";
	const href = lastCommit?.sha
		? `https://github.com/${repo}/commit/${lastCommit.sha}`
		: `https://github.com/${repo}`;
	return {
		title: `Pushed ${commits.length} commit${commits.length > 1 ? "s" : ""} · ${repo}`,
		description: message,
		href,
		timestamp: event.created_at,
	};
};

const parsePullRequestEvent = (event) => {
	const pr = event.payload?.pull_request;
	if (!pr) return null;
	return {
		title: `${pr.merged ? "Merged" : "Opened"} PR · ${event.repo?.name ?? "Repo"}`,
		description: pr.title ?? "",
		href: pr.html_url ?? pr._links?.html?.href ?? "#",
		timestamp: event.created_at,
	};
};

const parseReleaseEvent = (event) => {
	const release = event.payload?.release;
	if (!release) return null;
	return {
		title: `Published release · ${event.repo?.name ?? "Repo"}`,
		description: release.name ?? release.tag_name ?? "New release",
		href: release.html_url ?? "#",
		timestamp: event.created_at,
	};
};

const parseCreateEvent = (event) => {
	const payload = event.payload ?? {};
	if (payload.ref_type === "repository") {
		return {
			title: `Created new repo · ${event.repo?.name ?? payload.ref ?? "Repo"}`,
			description: payload.description ?? "Bootstrapped a new codebase",
			href: `https://github.com/${event.repo?.name ?? payload.ref ?? ""}`,
			timestamp: event.created_at,
		};
	}
	if (payload.ref_type === "branch") {
		return {
			title: `Created branch · ${payload.ref ?? "branch"}`,
			description: `Spun up a branch in ${event.repo?.name ?? "repository"}`,
			href: `https://github.com/${event.repo?.name ?? ""}/tree/${payload.ref ?? ""}`,
			timestamp: event.created_at,
		};
	}
	return null;
};

const parseIssuesEvent = (event) => {
	const issue = event.payload?.issue;
	if (!issue) return null;
	const action = event.payload?.action ?? "updated";
	return {
		title: `${action.charAt(0).toUpperCase()}${action.slice(1)} issue · ${event.repo?.name ?? "Repo"}`,
		description: issue.title ?? "Issue activity",
		href: issue.html_url ?? "#",
		timestamp: event.created_at,
	};
};

const eventParsers = {
	PushEvent: parsePushEvent,
	PullRequestEvent: parsePullRequestEvent,
	ReleaseEvent: parseReleaseEvent,
	CreateEvent: parseCreateEvent,
	IssuesEvent: parseIssuesEvent,
};

const buildActivityItem = (activity) => {
	const li = document.createElement("li");
	li.className =
		"rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/70";
	const title = document.createElement("a");
	title.href = activity.href ?? "#";
	title.target = "_blank";
	title.rel = "noreferrer noopener";
	title.className = "font-semibold text-slate-900 transition hover:text-brand dark:text-white";
	title.textContent = activity.title ?? "Recent activity";
	const description = document.createElement("p");
	description.className = "mt-2 text-slate-600 dark:text-slate-300";
	description.textContent = activity.description ?? "";
	const meta = document.createElement("p");
	meta.className = "mt-3 text-xs uppercase tracking-[0.3em] text-slate-500";
	meta.textContent = formatRelativeTime(activity.timestamp);
	li.append(title, description, meta);
	return li;
};

const renderActivities = (container, activities) => {
	container.innerHTML = "";
	if (!activities.length) {
		const empty = document.createElement("p");
		empty.className = "text-sm text-slate-600 dark:text-slate-300";
		empty.textContent = "No recent GitHub activity detected. Check back soon.";
		container.append(empty);
		return;
	}
	const list = document.createElement("ul");
	list.className = "space-y-3";
	for (const activity of activities) {
		list.append(buildActivityItem(activity));
	}
	container.append(list);
};

export const initActivityFeed = (config) => {
	const container = document.getElementById("activity-feed");
	if (!container) return;
	const username = config?.githubUser;
	if (!username) {
		renderActivities(container, []);
		return;
	}
	container.innerHTML = "";
	const status = document.createElement("p");
	status.className = "text-sm text-slate-600 dark:text-slate-300";
	status.textContent = config?.loadingMessage ?? "Loading recent activity...";
	container.append(status);
	const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=12`;
	fetch(url, {
		headers: {
			Accept: "application/vnd.github+json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`GitHub API responded with ${response.status}`);
			}
			return response.json();
		})
		.then((events) => {
			if (!Array.isArray(events)) {
				renderActivities(container, []);
				return;
			}
			const activities = [];
			for (const event of events) {
				if (activities.length >= MAX_ITEMS) break;
				const parser = eventParsers[event.type];
				if (!parser) continue;
				const activity = parser(event);
				if (!activity) continue;
				activities.push(activity);
			}
			renderActivities(container, activities);
		})
		.catch(() => {
			container.innerHTML = "";
			const error = document.createElement("p");
			error.className = "text-sm text-slate-600 dark:text-slate-300";
			error.textContent = config?.errorMessage ?? "Unable to load activity right now.";
			container.append(error);
		});
};
