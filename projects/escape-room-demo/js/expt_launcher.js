

function nextTrial() {
  if (!startedexperiment) { return; }
  // this is used for any change in game (i.e. restart; new game; completed game)
  
  hideHelpPopup();
  hideLevelPopup();
  // increment trial
  coding.index++;
  coding.trial++;
  // update
  updateSdata();
  // timestamp
  coding.timestamp = getTimestamp();
  // reset trial stats
  coding.answering = true;
  coding.solved = 0;
  

    if (flag_restart == 1) {
      coding.attempts++} 
      else {
        coding.game ++;
        coding.attempts = 1;
      }

      board.uc.object.attr({"text": "Escape Room Demo" });
      board.dl.object.attr({"text": (key_dl + "restart")});
      board.dl.object.attr({"opacity": op_dl});
      resetGrid();

    }


    function solvedGame(){
      coding.solved = 1;
      coding.answering = 0;

      showFeedbackPos();
      setTimeout(function(){hideFeedback();nextTrial();}, 500);
    }

    function restartGame(){
        
          flag_restart = true;
          showFeedbackRestart();
          setTimeout(function(){hideFeedback();nextTrial();}, 500);
    
    }


    function newGame(){
      showFeedbackNew();
      setTimeout(function(){hideFeedback();nextTrial();}, 500);
    }



