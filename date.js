const domReady = function () {
	class Mask {
		constructor(elementId, char, length, positions) {
			this.elementId = elementId;
			this.char = char;
			this.length = length;
			this.positions = positions;
		}

		validateKeyInput = (e) => {
			console.log(e);
			// Allow arrow, backspace, shift and tab keys
			if (e.key.charCodeAt() === 65 || e.key.charCodeAt() === 66 || e.key.charCodeAt() === 83 || e.key.charCodeAt() === 84) {
				return;
			}
			// Allow crtl + x, ctrl + c and ctrl + v
			if ((e.metaKey || e.ctrlKey) && (e.key === 'x' || e.key === 'c' || e.key === 'v')) {
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

		formatMask = (e) => {
			let formattedValiue = '';
			const inputValue = e.target.value.split('');

			inputValue.forEach((character, index) => {
				for (let i = 0; i < this.positions.length; i++) {
					if (formattedValiue.length === this.positions[i]) {
						formattedValiue += this.char;
					}
				}
				if (character.search(/[\d]/) > -1) {
					formattedValiue += character;
				}
			})
			if (formattedValiue.length > this.length) {
				formattedValiue = formattedValiue.substring(0, this.length);
			}
			return formattedValiue;
		}

		updateValue = (e) => {
			const previous = e.target.dataset.previous;
			// Check that the input isn't longer than the maximum length
			if (e.target.value.length > this.length) {
				e.target.value = e.target.value.slice(0, this.length - 1);
			}

			// Determine if the input had multiple values or if the input has been completely filled out otherwise run the single mask
			if (e.target.value.length - e.target.dataset.previous.length > 1 || e.target.value.length === (this.length - this.positions.length) || e.target.value.length === this.length) {
				e.target.value = this.formatMask(e);
			} else if (previous && previous[previous.length - 1] != this.char) {
				e.target.value = this.formatMask(e);
			}
			e.target.dataset.previous = e.target.value;
		}

		initiate() {
			document.getElementById(this.elementId).addEventListener('input', this.updateValue);
			document.getElementById(this.elementId).addEventListener('keydown', this.validateKeyInput);
			document.getElementById(this.elementId).dataset.previous = "";
		}
	}

	const dateMask = new Mask('text-2019101045289', '/', 10, [2, 5]);

	dateMask.initiate();
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	domReady();
} else {
	document.addEventListener("DOMContentLoaded", domReady);
}