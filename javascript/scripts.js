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
        if(stringSimilarity.compareTwoStrings(input, toMatch) > .75){
          toDisplay = toDisplay.add("<a class = 'search_results col-12' href = " + tag + ">" + key + "</a><br />");
          break
        }

      }
      
    }
  }

  if (toDisplay.size == 0){
    document.getElementById("output").innerHTML = "<h2> Sorry, we didn't find what you were looking for! <br> <br> Try searching with more keywords, or check your spelling. </h2>"
  }
  else{
    document.getElementById("output").innerHTML = Array.from(toDisplay).join("\n");
  }
  
}