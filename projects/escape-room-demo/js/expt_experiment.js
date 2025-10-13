
function startExperiment() {
  // clean div
  goWebsite(html_task);
  // set flags
  startedexperiment  = true;
  finishedexperiment = false;
  // set new variables
  setExperiment();
  // run the experiment
  edata.exp_starttime = getTimestamp();
  runExperiment();
}

function finishExperiment_resize() {
  //instructions screen
  if(!isFullscreen() && $('#startButton').length>0){
    document.getElementById('startButton').disabled = true;
  }
  //task screen
  if(!isFullscreen() && startedexperiment && !finishedexperiment) {
    stopExperiment();
    saveExperiment("data/resize");
    goWebsite(html_errscreen);
  }
}

function finishExperiment_noresponse() {
  // stop the experiment
  edata.exp_finishtime = getTimestamp();
  stopExperiment();
  // send the data
  saveExperiment("data/noresponse");
  goWebsite(html_errnoresp);
}

function finishExperiment_game() {
  // stop the experiment
  edata.exp_finishtime = getTimestamp();
  stopExperiment();
  // send the data
  goWebsite(html_debrief);
  
}

function finishExperiment_data() {
  //sdata.RPM            = RPM;
  goWebsite(html_sending);
  saveExperiment("data/data");
  goWebsite(html_vercode);
}

function stopExperiment() {
  if(startedexperiment){
    // set flags
    finishedexperiment = true;
    removePaper();
  }
}

function saveExperiment(path_data){
  //set the data to be saved
  var path_tmp  = "data/tmp";

  var alldata = {
      task:       participant_task,
      path:       path_tmp,
      id:         participant_id,
      
      sdata:      JSON.stringify(sdata),
      edata:      JSON.stringify(edata),
      parameters: JSON.stringify(parameters),
  };
  if(finishedexperiment) {
    alldata.move = path_data;
  }
  //send it to the back-end
  logWrite(alldata);
}
