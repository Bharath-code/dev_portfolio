import anime from "animejs/lib/anime.es.js";

const prefersReducedMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () =>
	window.matchMedia("(pointer: fine)").matches;

const initCtaAnimations = () => {
	const buttons = document.querySelectorAll("[data-cta]");
	if (buttons.length === 0) return;

	for (const button of buttons) {
		const hoverIn = () => {
			anime.remove(button);
			anime({
				targets: button,
				translateY: -6,
				scale: 1.04,
				duration: 260,
				easing: "easeOutQuad",
			});
		};

		const hoverOut = () => {
			anime.remove(button);
			anime({
				targets: button,
				translateY: 0,
				scale: 1,
				duration: 320,
				easing: "easeOutExpo",
			});
		};

		button.addEventListener("pointerenter", hoverIn);
		button.addEventListener("pointerleave", hoverOut);
		button.addEventListener("focus", hoverIn);
		button.addEventListener("blur", hoverOut);
		button.addEventListener("pointerdown", () => {
			anime.remove(button);
			anime({
				targets: button,
				scale: 0.98,
				duration: 150,
				easing: "easeOutQuad",
			});
		});
		button.addEventListener("pointerup", hoverIn);
	}
};

const initTiltEffects = () => {
	if (!hasFinePointer()) return;
	const tiltTargets = document.querySelectorAll("[data-tilt]");
	if (tiltTargets.length === 0) return;

	for (const target of tiltTargets) {
		let frame = 0;

		const animateTilt = (rotateX, rotateY, translateY = -10, duration = 260) => {
			anime.remove(target);
			anime({
				targets: target,
				rotateX,
				rotateY,
				translateY,
				duration,
				easing: "easeOutQuad",
			});
		};

		const handlePointerMove = (event) => {
			if (frame) return;
			frame = window.requestAnimationFrame(() => {
				frame = 0;
				const rect = target.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				const percentX = x / rect.width - 0.5;
				const percentY = y / rect.height - 0.5;
				const rotateY = percentX * 14;
				const rotateX = percentY * -14;
				animateTilt(rotateX, rotateY);
			});
		};

		const resetTilt = () => {
			if (frame) {
				window.cancelAnimationFrame(frame);
				frame = 0;
			}
			anime.remove(target);
			anime({
				targets: target,
				rotateX: 0,
				rotateY: 0,
				translateY: 0,
				duration: 360,
				easing: "easeOutExpo",
			});
		};

		target.addEventListener("pointerenter", () => animateTilt(-4, 0, -8, 220));
		target.addEventListener("pointermove", handlePointerMove);
		target.addEventListener("pointerleave", resetTilt);
		target.addEventListener("pointercancel", resetTilt);
		target.addEventListener("pointerup", resetTilt);
		target.addEventListener("blur", resetTilt);
	}
};

const initHeroOrb = () => {
	const orb = document.querySelector("[data-hero-orb]");
	const rotator = orb?.querySelector("[data-hero-orb-rotator]");
	if (!orb || !rotator) return;

	anime({
		targets: rotator,
		rotateX: "+=360",
		rotateY: "+=360",
		duration: 18000,
		easing: "linear",
		loop: true,
	});

	if (!hasFinePointer()) return;

	let frame = 0;

	const handlePointerMove = (event) => {
		if (frame) return;
		frame = window.requestAnimationFrame(() => {
			frame = 0;
			const rect = orb.getBoundingClientRect();
			const percentX = (event.clientX - rect.left) / rect.width - 0.5;
			const percentY = (event.clientY - rect.top) / rect.height - 0.5;
			anime.remove(orb);
			anime({
				targets: orb,
				rotateX: percentY * -24,
				rotateY: percentX * 24,
				duration: 280,
				easing: "easeOutQuad",
			});
		});
	};

	const resetOrb = () => {
		if (frame) {
			window.cancelAnimationFrame(frame);
			frame = 0;
		}
		anime.remove(orb);
		anime({
			targets: orb,
			rotateX: 0,
			rotateY: 0,
			duration: 420,
			easing: "easeOutExpo",
		});
	};

	orb.addEventListener("pointermove", handlePointerMove);
	orb.addEventListener("pointerleave", resetOrb);
	orb.addEventListener("pointercancel", resetOrb);
};

export const initMicroInteractions = () => {
	if (prefersReducedMotion()) return;
	initCtaAnimations();
	initTiltEffects();
	initHeroOrb();
};
