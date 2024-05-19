const symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const inputBox = document.getElementById("inputBox");

// Loading the word list
let words = '';
fetch("english.json")
  .then(response => words = response.text());

// Format the word as a standard pattern
//  (substitute characters with those from the symbols string)
//  this function isn't used by the code but i'm keeping it here cause it might be handy
function patternify(word) {
  const patternMap = new Map();
  let symbolIndex = -1;
  let patternString = "";
  for(let i = 0; i < word.length; i++) {
    if(!patternMap.has(word[i])) {
      symbolIndex++;
      patternMap.set(word[i], symbols[symbolIndex]);
    }
    patternString += patternMap.get(word[i]);
  }
  return patternString;
}

// Turn a pattern into a searchable Regex expression
//  i'm so sorry
function regexify(pattern) {
  const patternMap = new Map();
  let symbolIndex = 1;
  let regexExp = '"';
  for(let i = 0; i < pattern.length; i++) {
    if(!patternMap.has(pattern[i])) {
      // Create a new capture group for a new character
      regexExp += "(\\w)";
      // Add negative lookbehinds to ensure that
      //  the capture group doesn't capture existing characters
      patternMap.forEach((value) => {
        // i love regex
        regexExp += `(?<!\\${value})`;
      });
      // Record the new character's capture group number in patternMap
      patternMap.set(pattern[i], symbolIndex);
      symbolIndex++;
    } else {
      // Reference an existing capture group
      regexExp += `\\${patternMap.get(pattern[i])}`;
    }
  }
  regexExp += '"';
  return regexExp;
}

function submit() {
  const input = inputBox.innerText;
  console.log(input);
  const regexExp = regexify(input);
  console.log(regexExp);
}

document.onkeydown = function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    if(inputBox.innerText)
      submit();
  }
}