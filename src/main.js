import animationConfig from "./data/animations.json";
import siteContent from "./data/site-content.json";
import { initAnimations } from "./modules/animations.js";
import { initNavigation } from "./modules/navigation.js";
import { initProjectModal } from "./modules/project-modal.js";
import { initTheme } from "./modules/theme.js";
import { renderContactLinks } from "./sections/contact.js";
import { renderExperience } from "./sections/experience.js";
import { renderProjects } from "./sections/projects.js";
import { renderServices } from "./sections/services.js";
import { renderSkills } from "./sections/skills.js";
import { initTestimonials } from "./sections/testimonials.js";
import { renderWorkingStyle } from "./sections/working-style.js";

initTheme();

const updateYear = () => {
	const yearEl = document.getElementById("year");
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear().toString();
	}
};

const initSiteContent = () => {
	const content = siteContent ?? {};
	renderProjects(content.projects);
	renderServices(content.services);
	renderSkills(content.skills);
	renderExperience(content.experience);
	renderWorkingStyle(content.workingStyle);
	initTestimonials(content.testimonials);
	renderContactLinks(content.contactLinks);
};

window.addEventListener("load", () => {
	initAnimations(animationConfig);
});

window.addEventListener("DOMContentLoaded", () => {
	initTheme();
	updateYear();
	initProjectModal();
	initSiteContent();
	initNavigation();
});
