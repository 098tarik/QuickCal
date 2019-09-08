function check_for_time(index){ //checks whether a particular word designates a time
  console.log('Begin check_for_time for:')
  console.log(index)
  sherlockTimeCheck = Sherlock.parse(text_cleaned[index])
  console.log("sherlockTimeCheck complete")
  if (sherlockTimeCheck.startDate == null){
    console.log('A');
    return false;
  } else {
      console.log(sherlockTimeCheck.startDate);
      console.log('B');
      return true;
    }
  }

function pasteSelection() {

  chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
    var text = document.getElementById('text'); 
    text.innerHTML = selection[0];;
    console.log(selection[0]);

var sherlocked = Sherlock.parse(selection[0]);

// Basic properties
var title = sherlocked.eventTitle;    // 'Homework 5 due'
var startDate = sherlocked.startDate; // Date object pointing to next monday at 3pm
var endDate = sherlocked.endDate;  
if (endDate = "null"){
  endDate = startDate;
}
console.log(endDate)   // null in this case, since no duration was given
var isAllDay = sherlocked.isAllDay;   // false, since a time is included with the event

// Format Date for Google Calander
console.log(startDate);
var year = startDate.toString().substr(11,4);
console.log(year);

var day = startDate.toString().substr(8,2);
console.log(day)

var time1 = startDate.toString().substr(16,2);
var num1 = parseInt(time1,10);
console.log(time1);
var newnum1 = num1 + 4;
var realTime1 = newnum1.toString(10)
console.log(realTime1)
var time2 = startDate.toString().substr(19,2);
console.log(time2)
var time3 = startDate.toString().substr(22,2);
console.log(time3)

if (endDate == startDate){

var etime1 = endDate.toString().substr(16,2);
var enum1 = parseInt(etime1,10);
console.log(etime1);
var enewnum1 = enum1 + 5;
var erealTime1 = enewnum1.toString(10)
console.log(erealTime1)
var etime2 = startDate.toString().substr(19,2);
console.log(etime2)
var etime3 = endDate.toString().substr(22,2);
console.log(etime3)
} else {var etime1 = endDate.toString().substr(16,2);
  var enum1 = parseInt(etime1,10);
  console.log(etime1);
  var enewnum1 = enum1 + 4;
  var erealTime1 = enewnum1.toString(10)
  console.log(erealTime1)
  var etime2 = startDate.toString().substr(19,2);
  console.log(etime2)
  var etime3 = endDate.toString().substr(22,2);
  console.log(etime3)}



var a = document.createElement('a');
var linkText = document.createTextNode("Create Event");
a.appendChild(linkText);
a.target = "_blank";
a.className = "button";
a.title = "my title text";
a.href = "https://www.google.com/calendar/r/eventedit?details=" + title + "&dates=" + year + "09" + day + "T" + realTime1 +time2 + time3 + "Z/"
 + year + "09" + day + "T" + erealTime1 + etime2 + etime3 + "Z" + "&location=" + location;
document.body.appendChild(a);


document.getElementById("title").innerHTML = title;
document.getElementById("startDate").innerHTML = startDate;
document.getElementById("endDate").innerHTML = endDate;

// code to find reference location
text_cleaned = selection[0].toLowerCase().split(" ");
var location = null; //initializes location
if (text_cleaned.includes('at')){
  var at1_index = text_cleaned.indexOf('at');
  var at2_index = text_cleaned.lastIndexOf('at'); //checks for second "at"
  if (check_for_time(at1_index+1) == false){ //if next word isn't a time word, it's probably a loc. word
    var location = text_cleaned[at1_index+1]+" "+text_cleaned[at1_index+2];}
  if (check_for_time(at2_index+1) == false){
    var location = text_cleaned[at2_index+1]+" "+text_cleaned[at2_index+2];
  }
}
//Assumes everything in sentence following "in" is location
if (text_cleaned.includes('in')){
  console.log('includes in')
  var in_index = text_cleaned.indexOf('in');
  i = 0; //incrementer
  location = "";
  while (in_index + i < length(text_cleaned) && i < 5 && text_cleaned[in_index+i].endsWith(".") == false){
    location = location + text_cleaned[in_index+i] + " ";
    console.log(location);
    i++;
  }
  } 



document.getElementById("location").innerHTML = location;
// Example of an additional custom property added by Watson
var validated = sherlocked.validated; // true
console.log(title,startDate,endDate,isAllDay,location)

})};


pasteSelection(); 





