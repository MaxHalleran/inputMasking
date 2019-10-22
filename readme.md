# Mask

## Input masking

The function is simple, on the keypress, it determines what the key is and whether it should be allowed or rejected. If it's allowed, it counts the number of characters in the string and if the last interaction was not a 'special' character being deleted and the current value is an appropriate length, it will add the 'special' character.

I used two inputs, one for visuals and the other for the actual value, but this is not completely necessary. As we're interacting with actual keypresses, we can determine exactly what keys should have an effect. The reason I went with two for each value is that the 'front facing' input is just a text input whereas the 'background' input is a number input, only allowing numbers.

## 

* Slash error

* autofill

* Refactor

Refactor / Loss of character issue addression

The flow goes:
* user inputs data
	* If it's a typed character and not pasted/autocompleted, we evaluate the character
	* Then we evaluate what the final result would be and format it

Needed information:
* The input value
* The replacement character
	* Technically contained in the data mask but we will provide them ourselves
* The positions of replacement
	* Technically contained in the data mask but we will provide them ourselves
* Target max string length
	* Contained in the data-mask value ie. the length of the mask


We dont need to worry about string length as of yet. Let's find a way to evaluate strings and reformat them if they're not valid.

So as we're validating, we need to take into account the fact that the strings can be one larger according to the mask.