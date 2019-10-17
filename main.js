console.log('Hello World');

const domReady = function () {
	easyMask();
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	domReady();
} else {
	document.addEventListener("DOMContentLoaded", domReady);
}

function easyMask() {
	console.log('The easiest mask');

	// Setting up variables
	const dateVisual = document.getElementById('date-visual');
	const dateValue = document.getElementById('date-value');
	const cardVisual = document.getElementById('card-visual');
	const cardValue = document.getElementById('card-value');
	const button = document.getElementById('submit');

	// dateValidate
	function dateValidate(e) {
		console.log(e);
		// Lets validate whether the value of the date field should change.
		if (e.code.includes('Key')) {
			e.preventDefault();
			return false;
		}
		if (e.target.value.length > 9 && e.code.includes("Digit")) {
			e.preventDefault();
			return false;
		}
	}

	function cardValidate(e) {
		if (e.keycode === 69 || e.target.value.length > 18 && e.code.includes("Digit")) {
			console.log(e);
			e.preventDefault();
			return false;
		}
	}

	/**
	 * dateMask
	 * This function is called on input's looking to mask the date with the form XX/XX/XXXX
	 * 
	 * @param {Event} e - The event taking place
	 * @param {Node} target - The hidden field
	*/
	function dateMask(e, target) {
		// Let's see if we should add a slash.
		const previous = e.target.dataset.previous;

		// Not perfect
		if (previous[previous.length - 1] !== "/") {
			if (e.target.value.length === 2 || e.target.value.length === 5) {
				e.target.value += '/';
			}
		}

		e.target.dataset.previous = e.target.value;
		// Lets ensure that the value we're passing to the hidden field is valid
		const newValue = e.target.value.replace(/[/\s]/g, "");
		target.value = newValue;
	}

	// The Card Mask function following XXXX XXXX XXXX XXXX
	function cardMask(e, target) {
		const previous = e.target.dataset.previous;

		// The Mask
		if (previous[previous.length - 1] !== " ") {
			if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) {
				e.target.value += ' ';
			}
		}

		e.target.dataset.previous = e.target.value;
		const newValue = e.target.value.replace(/[/\s]/g, "");
		target.value = newValue;
	}

	// Update the actual value in the hidden field
	function updateValue(e) {
		const target = document.getElementById(e.target.dataset.type + "-value");
		if (e.target.dataset.type === "date") {
			dateMask(e, target);
		} else if (e.target.dataset.type === "card") {
			cardMask(e, target);
		} else {
			console.log('Huh, something went wrong. Maybe there\'s an unspecified input element?');
		}
	}

	// Logging the submit button
	function logSubmit(e) {
		console.log('Submitting!');
		console.log('The event is: ', e);
		console.log("Date Visual: ", dateVisual.value);
		console.log("Date Value: ", dateValue.value);
		console.log("Card Visual: ", cardVisual.value);
		console.log("Card Value: ", cardValue.value);
	}

	// Attaching events
	dateVisual.addEventListener('input', updateValue);
	dateVisual.addEventListener('keydown', dateValidate);
	cardVisual.addEventListener('input', updateValue);
	cardVisual.addEventListener('keydown', cardValidate);
	button.addEventListener('click', logSubmit);
}