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
if (year != null) {
  var year = startDate.toString().substr(11,4);
}
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
var text_split = selection[0].split(" ");
var text_lower_split = selection[0].toLowerCase().split(" ");
var location = null; //initializes location
if (text_lower_split.includes('at')){
  var at1_index = text_lower_split.indexOf('at');
  var at2_index = text_lower_split.lastIndexOf('at'); //checks for second "at"
  if (check_for_time(at1_index+1) == false){ //if next word isn't a time word, it's probably a loc. word
    var location = text_split[at1_index+1]+" "+text_split[at1_index+2];}
  if (check_for_time(at2_index+1) == false){
    var location = text_split[at2_index+1]+" "+text_split[at2_index+2];
  }
}
//Assumes everything in sentence following "in" is location
if (text_lower_split.includes('in')){
  console.log('includes in')
  var in_index = text_lower_split.indexOf('in');
  i = 0; //incrementer
  location = "";
  while (in_index + i < text_split.length && i < 5 && text_split[in_index+i].endsWith(".") == false){
    location = location + text_lower_split[in_index+i] + " ";
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





