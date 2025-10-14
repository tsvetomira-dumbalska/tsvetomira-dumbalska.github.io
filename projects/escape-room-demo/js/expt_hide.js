
<!-- Hide methods -->
function hideTrial() {
  hideFixation(board.fixation);
  hideStimuli();
  hideInstructions();
  hideClock();
}

function hideFeedback() {
   board.posfeedback.object.attr({"opacity": 0});
   board.resfeedback.object.attr({"opacity": 0});  
   board.newfeedback.object.attr({"opacity": 0});
   board.nolfeedback.object.attr({"opacity": 0});
}

function hideProgress() {
   board.background.object.toBack();
   board.background.object.attr({"opacity": 0});
   board.progress[0].object.attr({"opacity": 0});
   board.progress[1].object.attr({"opacity": 0});
   board.progress[2].object.attr({"opacity": 0});
   board.progress[3].object.attr({"opacity": 0});
   board.progress[4].object.attr({"opacity": 0});
}

function hideBlock() {
  board.block.object.remove();
}

function hideHelpPopup() {
    board.help.popupRect.hide();
    board.help.popupText.hide();
    board.help.closeBtn.hide();
    board.help.popupRect.toBack();
    board.help.popupText.toBack();
    board.help.closeBtn.toBack();
}

function hideLevelPopup() {
    board.level.popupRect.hide();
    board.level.popupText.hide();
    board.level.closeBtn.hide();
    board.level.popupRect.toBack();
    board.level.popupText.toBack();
    board.level.closeBtn.toBack();

    // Remove dropdown if present
    var dropdown = document.getElementById('levelDropdown');
    if (dropdown) {
        dropdown.parentNode.removeChild(dropdown);
    }

    // Remove Go button if present
    var goBtn = document.getElementById('levelGoBtn');
    if (goBtn) {
        goBtn.parentNode.removeChild(goBtn);
    }
}