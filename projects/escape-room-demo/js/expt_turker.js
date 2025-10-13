html_humanform = "html/turker_form.html";
//html_welcome = "html/welcome.html";

var participant_age    = '';
var participant_gender = '';
var participant_turker = '';
function getTurkerform(){
  participant_age    = document.getElementById("ageSelect").value;
  participant_gender = document.getElementById("genderSelect").value;
  participant_turker = document.getElementById("turkerSelect").value;
}


var RPM = {};

function getRPMform(m){
  RPM[m] = document.getElementById("RMP" + m + "Select").value;
}