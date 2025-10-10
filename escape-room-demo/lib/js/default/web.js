
<!-- Div methods  -->

var html_start            = "lib/html/start.html";
var html_welcome          = "html/welcome.html";
var html_welcome_m        = "html/welcome_m.html";
var html_infosheet        = "lib/html/information_sheet.html";
var html_consentform      = "lib/html/consent_form.html";
//var html_humanform        = "lib/html/human_form.html";
var html_load             = "html/loading.html";
var html_instructions     = "html/instructions.html";
var html_instructions_m   = "html/instructions_m.html";
var html_task             = "html/task.html";
var html_errnoresp        = "lib/html/error_noresponse.html";
var html_errscreen        = "lib/html/error_fullscreen.html";
var html_sending          = "html/sending_data.html";
var html_debrief          = "html/debriefing.html";
var html_vercode          = "html/end.html";
var html_underperf        = "php/under_performance.php";
var RPM1 = "html/RPM1.html";
var RPM2 = "html/RPM2.html";
var RPM3 = "html/RPM3.html";
var RPM4 = "html/RPM4.html";
var RPM5 = "html/RPM5.html";
var RPM6 = "html/RPM6.html";
var RPM7 = "html/RPM7.html";
var RPM8 = "html/RPM8.html";
var RPM9 = "html/RPM9.html";


function emptyDiv(divid) {
  document.getElementById(divid).innerHTML = "";
}
function printDiv(divid,webfile) {
  if(typeof(coding)=="undefined"){
    coding = {};
  }
  // webdata
  var webdata = {};
  switch (webfile) {
    case html_vercode:
      webdata.minimum_performance     = parameters.minimum_performance;
      webdata.participant_performance = participant_performance;
      webdata.participant_id          = participant_id;
      break;
    case html_underperf:
      webdata.minimum_performance     = parameters.minimum_performance;
      webdata.participant_performance = participant_performance;
      webdata.participant_id          = participant_id;
      break;
  }
  // webfunc
  var webfunc;
  switch (webfile) {
    case html_sending:
      webfunc = function(data) {
        if(coding.webfile==html_vercode){   return; }
        if(coding.webfile==html_underperf){ return; }
        document.getElementById(divid).innerHTML = data;
        coding.webfile = webfile;
      }
      break;
    default:
      webfunc = function(data) {
        document.getElementById(divid).innerHTML = data;
        coding.webfile = webfile;
      }
      break;
  }
  // send
  $.post(webfile,webdata,webfunc);
}
function hideDiv(element){
      document.getElementById(element).hidden = true;
}
function showDiv(element){
      document.getElementById(element).hidden = false;
}
function goWebsite(url) {
  $("#content").load(url);
}

<!-- Auxiliar methods for HTML templates -->
var participant_id     = makeId();
var participant_age    = '';
var participant_gender = '';
function getHumanform(){
  participant_age    = document.getElementById("ageSelect").value;
  participant_gender = document.getElementById("genderSelect").value;
}
