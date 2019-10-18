const domReady = function () {
	// Setting up variables
	const dateVisual = document.getElementById('date-visual');
	const dateValue = document.getElementById('date-value');
	const cardVisual = document.getElementById('card-visual');
	const cardValue = document.getElementById('card-value');
	const button = document.getElementById('submit');

	function validate(e) {
		const maxLength = e.target.dataset.mask.length - 1;

		if (e.key.charCodeAt() === 66) {
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

		if (e.target.value.length > maxLength && e.code.includes("Digit")) {
			e.preventDefault();
			return false;
		}
		
	}

	/**
	 * dateMask
	 * This function is called on input's looking to mask the date with the form XX/XX/XXXX
	 * 
	 * @param {Event} e - The event taking place
	*/
	function dateMask(e) {
		if (e.target.value.length === 2 || e.target.value.length === 5) {
			e.target.value += '/';
		}
	}

	// The Card Mask function following XXXX XXXX XXXX XXXX
	function cardMask(e) {
		if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) {
			e.target.value += ' ';
		}
	}

	function standardMask(e, target, char) {
		const previous = e.target.dataset.previous;

		if (previous && previous[previous.length - 1] != char) {
			if (e.target.dataset.type === "date") {
				dateMask(e);
			} else if (e.target.dataset.type === "card") {
				cardMask(e);
			}
		}

		e.target.dataset.previous = e.target.value;
		target.value = e.target.value.replace(/[/\s]/g, "");
	}

	// Update the actual value in the hidden field
	function updateValue(e) {
		const target = document.getElementById(e.target.dataset.type + "-value");
		if (e.target.dataset.type === "date") {
			standardMask(e, target, "/");
		} else if (e.target.dataset.type === "card") {
			standardMask(e, target, " ");
		} else {
			console.log('Huh, something went wrong. Maybe there\'s an unspecified input element?');
		}
	}

	// Logging the submit button
	function logSubmit(e) {
		console.log("Date Value: ", dateValue.value);
		console.log("Card Value: ", cardValue.value);
	}

	// Attaching events
	dateVisual.addEventListener('input', updateValue);
	dateVisual.addEventListener('keydown', validate);
	cardVisual.addEventListener('input', updateValue);
	cardVisual.addEventListener('keydown', validate);
	button.addEventListener('click', logSubmit);
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	domReady();
} else {
	document.addEventListener("DOMContentLoaded", domReady);
}