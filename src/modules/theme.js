const THEME_STORAGE_KEY = "theme-preference";

const setTheme = (mode, themeIcon) => {
	if (mode === "dark") {
		document.documentElement.classList.add("dark");
		themeIcon?.setAttribute(
			"d",
			"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
		);
	} else {
		document.documentElement.classList.remove("dark");
		themeIcon?.setAttribute(
			"d",
			"M12 3v2.4M12 18.6V21M4.8 12H3M21 12h-2.4M5.636 5.636 7.124 7.124M18.364 18.364 16.876 16.876M5.636 18.364l1.488-1.488M18.364 5.636l-1.488 1.488M12 8.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z",
		);
	}
	localStorage.setItem(THEME_STORAGE_KEY, mode);
};

const currentTheme = () => {
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored) return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

let listenerBound = false;

export const initTheme = () => {
	const themeToggleButton = document.querySelector("#theme-toggle");
	const themeIcon = document.querySelector("#theme-icon path");
	const applyTheme = (mode) => setTheme(mode, themeIcon);
	const toggleTheme = () => {
		const next = currentTheme() === "dark" ? "light" : "dark";
		applyTheme(next);
	};
	if (themeToggleButton && !listenerBound) {
		themeToggleButton.addEventListener("click", toggleTheme);
		listenerBound = true;
	}
	applyTheme(currentTheme());
};
