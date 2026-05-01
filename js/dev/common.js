//#region src/js/common/functions.js
var slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains("--slide")) {
		target.classList.add("--slide");
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore && target.style.removeProperty("height");
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			!showmore && target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("--slide");
			document.dispatchEvent(new CustomEvent("slideUpDone", { detail: { target } }));
		}, duration);
	}
};
var slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains("--slide")) {
		target.classList.add("--slide");
		target.hidden = target.hidden ? false : null;
		showmore && target.style.removeProperty("height");
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("--slide");
			document.dispatchEvent(new CustomEvent("slideDownDone", { detail: { target } }));
		}, duration);
	}
};
var slideToggle = (target, duration = 500) => {
	if (target.hidden) return slideDown(target, duration);
	else return slideUp(target, duration);
};
function dataMediaQueries(array, dataSetValue) {
	const media = Array.from(array).filter((item) => item.dataset[dataSetValue]).map((item) => {
		const [value, type = "max"] = item.dataset[dataSetValue].split(",");
		return {
			value,
			type,
			item
		};
	});
	if (media.length === 0) return [];
	const breakpointsArray = media.map(({ value, type }) => `(${type}-width: ${value}px),${value},${type}`);
	return [...new Set(breakpointsArray)].map((query) => {
		const [mediaQuery, mediaBreakpoint, mediaType] = query.split(",");
		const matchMedia = window.matchMedia(mediaQuery);
		return {
			itemsArray: media.filter((item) => item.value === mediaBreakpoint && item.type === mediaType),
			matchMedia
		};
	});
}
//#endregion
//#region src/js/app.js
document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", function() {
	function initializeTimer(selector, duration) {
		const timer = document.querySelector(selector);
		if (!timer) return;
		const minutesEl = timer.querySelector(".minutes");
		const secondsEl = timer.querySelector(".seconds");
		const endTime = Date.now() + duration;
		function updateTimer() {
			const remaining = endTime - Date.now();
			if (remaining <= 0) {
				minutesEl.textContent = "00";
				secondsEl.textContent = "00";
				return;
			}
			const minutes = Math.floor(remaining / 1e3 / 60 % 60);
			const seconds = Math.floor(remaining / 1e3 % 60);
			minutesEl.textContent = String(minutes).padStart(2, "0");
			secondsEl.textContent = String(seconds).padStart(2, "0");
		}
		updateTimer();
		setInterval(updateTimer, 1e3);
	}
	initializeTimer(".header__timer", 3599e3);
	const expandButton = document.getElementById("expandButton");
	const expandButtonText = expandButton.querySelector("span");
	const expandableContent = document.getElementById("expandableContent");
	expandButton.addEventListener("click", function() {
		expandButton.classList.toggle("expanded");
		expandableContent.classList.toggle("expanded");
		expandButtonText.textContent = expandableContent.classList.contains("expanded") ? "Згорнути" : "Розгорнути";
		if (expandableContent.classList.contains("expanded")) {
			const windowHeight = window.innerHeight;
			if (expandableContent.scrollHeight > windowHeight) window.scrollTo({ behavior: "smooth" });
		} else window.scrollTo({ behavior: "smooth" });
	});
	const totalElements = document.querySelectorAll(".fixed-block-hide");
	const fixedElement = document.querySelector(".fixed-block");
	if (!totalElements.length || !fixedElement) return;
	const observer = new IntersectionObserver((entries) => {
		let anyVisible = false;
		entries.forEach((entry) => {
			if (entry.isIntersecting) anyVisible = true;
		});
		if (anyVisible) fixedElement.classList.add("hide");
		else fixedElement.classList.remove("hide");
	}, { threshold: .1 });
	totalElements.forEach((el) => observer.observe(el));
});
//#endregion
export { slideToggle as n, slideUp as r, dataMediaQueries as t };
