# Mask

## Input masking

The function is simple, on the keypress, it determines what the key is and whether it should be allowed or rejected. If it's allowed, it counts the number of characters in the string and if the last interaction was not a 'special' character being deleted and the current value is an appropriate length, it will add the 'special' character.

I used two inputs, one for visuals and the other for the actual value, but this is not completely necessary. As we're interacting with actual keypresses, we can determine exactly what keys should have an effect. The reason I went with two for each value is that the 'front facing' input is just a text input whereas the 'background' input is a number input, only allowing numbers.