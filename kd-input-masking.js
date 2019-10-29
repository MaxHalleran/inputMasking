const domReady = function () {
	class Mask {
		constructor(elementId, char, length, positions, expiryField = false) {
			this.elementId = elementId;
			this.char = char;
			this.length = length;
			this.positions = positions;
			this.expiryField = expiryField;

			this.initiate();
		}

		validateKeyInput = (e) => {
			if (e.key) {
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

		expiryValidate = (input) => {
			let output = '';

			if (input.search(/^\d\d\/\d\d\d\d$/) > -1) {
				console.log('Matches');
				output += input.substring(0, 3);
				output += input.substring(input.length - 2);
			} else {
				output += input;
			}

			return output;
		}

		updateValue = (e) => {
			const previous = e.target.dataset.previous;

			// Expiry fields are sometimes handed the month and the year in full. We'll check and if this is true, trim it to 4 digits.
			if (this.expiryField) {
				e.target.value = this.expiryValidate(e.target.value);
			}

			// Check that the input isn't longer than the maximum length
			if (e.target.value.length > this.length && this.expiryField !== true) {
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
			if (document.getElementById(this.elementId)) {
				document.getElementById(this.elementId).addEventListener('input', this.updateValue);
				document.getElementById(this.elementId).addEventListener('keydown', this.validateKeyInput);
				document.getElementById(this.elementId).dataset.previous = "";
			}
		}
	}

	const dateMask = new Mask('text-2019101045289', '/', 10, [2, 5]);
	const creditCardMask = new Mask('credit-card-number', ' ', 19, [4, 9, 14]);
	const creditCardExpiryDate = new Mask('credit-card-expiry', '/', 5, [2], true);
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	domReady();
} else {
	document.addEventListener("DOMContentLoaded", domReady);
}