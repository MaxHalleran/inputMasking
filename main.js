const domReady = function () {
	class Mask {
		constructor(elementId, char, length, positions) {
			this.elementId = elementId;
			this.char = char;
			this.length = length;
			this.positions = positions;
		}

		validateKeyInput = (e) => {
			if (e.key.charCodeAt() === 66 || e.key.charCodeAt() === 84) {
				return;
			}
			if (e.key.charCodeAt() > 57 && e.key.charCodeAt() !== 127) {
				e.preventDefault();
				return false;
			}
			if (e.key.charCodeAt() > 31 && e.key.charCodeAt() < 48) {
				e.preventDefault();
				return false;
			}
			if (e.target.value.length > this.length - 1 && e.code.includes("Digit")) {
				e.preventDefault();
				return false;
			}
		}

		mask = (e) => {
			let specialChar = false;
			this.positions.forEach(position => {
				if (e.target.value.length === position) {
					specialChar = true;
				}
			});
			e.target.value += specialChar ? this.char : '';
		}

		updateValue = (e) => {
			const previous = e.target.dataset.previous;
			// We want to make sure the updated value wont be longer than the allowed amount
			if (e.target.value.length > this.length) {
				e.target.value = e.target.value.slice(0, this.length - 1);
			}
			if (previous && previous[previous.length - 1] != this.char) {
				this.mask(e);
			}
			e.target.dataset.previous = e.target.value;
		}

		initiate() {
			document.getElementById(this.elementId).addEventListener('input', this.updateValue);
			document.getElementById(this.elementId).addEventListener('keydown', this.validateKeyInput);
		}
	}

	const dateMask = new Mask('date', '/', 10, [2, 5]);
	const cardMask = new Mask('card', ' ', 19, [4, 9, 14]);

	dateMask.initiate();
	cardMask.initiate();

	// Logging the submit button
	const button = document.getElementById('submit');
	function logSubmit(e) {
		console.log("Date Value: ", date.value);
		console.log("Card Value: ", card.value.replace(/[/\s]/g, ""));
	}
	button.addEventListener('click', logSubmit);
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	domReady();
} else {
	document.addEventListener("DOMContentLoaded", domReady);
}