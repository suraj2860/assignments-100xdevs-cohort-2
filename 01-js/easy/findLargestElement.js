/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    if(numbers.length == 0) return undefined;
    return numbers.reduce((acc, curr, i) => {
        if(acc > curr) return acc;
        else return curr;
    });
}

module.exports = findLargestElement;

// console.log(findLargestElement([333, 77, 2, 9999, 1]));