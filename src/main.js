import animationConfig from "./data/animations.json";
import siteContent from "./data/site-content.json";
import { initActivityFeed } from "./modules/activity-feed.js";
import { initAnimations } from "./modules/animations.js";
import { initNavigation } from "./modules/navigation.js";
import { initProjectModal } from "./modules/project-modal.js";
import { initTheme } from "./modules/theme.js";
import { renderContactLinks } from "./sections/contact.js";
import { renderExperience } from "./sections/experience.js";
import { renderImpact } from "./sections/impact.js";
import { renderProjects } from "./sections/projects.js";
import { renderRecruiterCta } from "./sections/recruiter.js";
import { renderServices } from "./sections/services.js";
import { renderSignalHighlights, renderWritingHighlights } from "./sections/signals.js";
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
	renderImpact(content.impactHighlights);
	renderProjects(content.projects);
	renderServices(content.services);
	renderSkills(content.skills, content.skillMatrix);
	renderExperience(content.experience);
	renderWorkingStyle(content.workingStyle);
	initTestimonials(content.testimonials);
	renderContactLinks(content.contactLinks);
	renderSignalHighlights(content.signalHighlights);
	renderWritingHighlights(content.signalHighlights);
	renderRecruiterCta(content.recruiterCta);
	initActivityFeed(content.activity);
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
