/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const regex = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g;
  return str.replace(regex, '').toLowerCase() == str.replace(regex, '').toLowerCase().split('').reverse().join('');
}

//console.log(isPalindrome("malayalam"));

module.exports = isPalindrome;
