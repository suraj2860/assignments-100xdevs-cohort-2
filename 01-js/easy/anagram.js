/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  return JSON.stringify(str1.toLowerCase().split('').sort()) == JSON.stringify(str2.toLowerCase().split('').sort());
}

module.exports = isAnagram;


//console.log(isAnagram("Debit Card", "Bad Credit"));
//console.log(JSON.stringify(['s','p','a'].sort()) == JSON.stringify(['a','p','s','w'].sort()))