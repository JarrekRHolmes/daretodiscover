(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var stringSimilarity = require('string-similarity');

document.getElementById("search_input").addEventListener("keyup", function (e) {
     search(e);
  })

function search(e){
  var input = document.getElementById("search_input").value
  var inputArray = input.split(" ")
  var toDisplay = new Set()


  for (var key in searchables){
    for (var i = 0; i < inputArray.length; i++){
      input = inputArray[i].toLowerCase().replace(/[^a-z]/gi, '')
      var tag = searchables[key][0];
      var identifiers = searchables[key][1];
      for(var j = 0; j < identifiers.length; j++){
        var toMatch = identifiers[j]
        if(stringSimilarity.compareTwoStrings(input, toMatch) > .7){
          toDisplay = toDisplay.add("<a class = 'search_results col-12' href = " + tag + ">" + key + "</a><br />");
          break
        }

      }
      
    }
  }

  if (toDisplay.size == 0){
    document.getElementById("output").innerHTML = "<h2> Try searching with more keywords, or check your spelling. </h2>"
  }
  else{
    document.getElementById("output").innerHTML = Array.from(toDisplay).join("\n");
  }
  
}
},{"string-similarity":2}],2:[function(require,module,exports){
module.exports = {
	compareTwoStrings,
	findBestMatch
};

function compareTwoStrings (str1, str2) {
	if (!str1.length && !str2.length) return 1;                    // if both are empty strings
	if (!str1.length || !str2.length) return 0;                    // if only one is empty string
	if (str1.toUpperCase() === str2.toUpperCase()) return 1;       // identical
	if (str1.length === 1 && str2.length === 1) return 0;          // both are 1-letter strings

	const pairs1 = wordLetterPairs(str1);
	const pairs2 = wordLetterPairs(str2);
	const union = pairs1.length + pairs2.length;
	let intersection = 0;
	pairs1.forEach(pair1 => {
		for (let i = 0, pair2; pair2 = pairs2[i]; i++) {
			if (pair1 !== pair2) continue;
			intersection++;
			pairs2.splice(i, 1);
			break;
		}
	});
	return intersection * 2 / union;
}

function findBestMatch (mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	const ratings = targetStrings.map(target => ({ target, rating: compareTwoStrings(mainString, target) }));
	const bestMatch = Array.from(ratings).sort((a, b) => b.rating - a.rating)[0];
	return { ratings, bestMatch };
}

function flattenDeep (arr) {
	return Array.isArray(arr) ? arr.reduce((a, b) => a.concat(flattenDeep(b)) , []) : [arr];
}

function areArgsValid (mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find(s => typeof s !== 'string')) return false;
	return true;
}

function letterPairs (str) {
	const pairs = [];
	for (let i = 0, max = str.length - 1; i < max; i++) pairs[i] = str.substring(i, i + 2);
	return pairs;
}

function wordLetterPairs (str) {
	const pairs = str.toUpperCase().split(' ').map(letterPairs);
	return flattenDeep(pairs);
}

},{}]},{},[1]);
