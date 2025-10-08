import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const initAnimations = (config) => {
	if (prefersReducedMotion()) return;
	if (!config) return;

	if (Array.isArray(config.entryAnimations)) {
		for (const animation of config.entryAnimations) {
			if (!animation?.selector || !animation.from) continue;
			gsap.from(animation.selector, animation.from);
		}
	}

	const scrollConfig = config.scrollAnimation;
	if (scrollConfig?.selector && scrollConfig.from) {
		const sections = gsap.utils.toArray(scrollConfig.selector);
		for (let index = 0; index < sections.length; index += 1) {
			const section = sections[index];
			if (scrollConfig.skipFirst && index === 0) continue;
			const options = JSON.parse(JSON.stringify(scrollConfig.from));
			if (options.scrollTrigger) {
				options.scrollTrigger = { ...options.scrollTrigger, trigger: section };
			} else {
				options.scrollTrigger = { trigger: section };
			}
			gsap.from(section, options);
		}
	}
};
