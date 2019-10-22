# Mask

## 

* Slash error
* autofill
* paste and multiple input values/characters
* IE Compatible

The flow goes:
* user inputs data
	* If it's a typed character and not pasted/autocompleted, we evaluate the character
	* If it's more than one character, we need to evaluate the current value and reformat it properly

Needed information:
* The input value
* The replacement character
	* Technically contained in the data mask but we will provide them ourselves
* The positions of replacement
	* Technically contained in the data mask but we will provide them ourselves
* Target max string length
	* Contained in the data-mask value ie. the length of the mask

As we're validating, at certain value lengths, we should evaluate the current value and update/correct it