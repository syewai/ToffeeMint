/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      } 
      alert('Query Variable ' + variable + ' not found');
}

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
//this function is to put lc that requires action(rejected/requested to amend) at the top of the list
function rearrangePosition(e) {

}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function seperateWords(word) {
   var count=0,len=word.length;
   for(var i=0;i<len;i++) {
    if(/[A-Z]/.test(word.charAt(i))) word.charAt(i-1);
  } 
}

function countUpperCaseChars(str) {
  var count=0,len=str.length;
  for(var i=0;i<len;i++) {
    if(/[A-Z]/.test(str.charAt(i))) count++;
  }
  return count;
}