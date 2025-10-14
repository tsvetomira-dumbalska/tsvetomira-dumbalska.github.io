
<!-- Show methods -->


function showFeedbackPos() {
  board.posfeedback.object.attr({"opacity": 1});
  board.posfeedback.object.toFront();
  
}
function showFeedbackRestart() {
  board.resfeedback.object.attr({"opacity": 1});
  board.resfeedback.object.toFront();
}
function showFeedbackNew() {
  board.newfeedback.object.attr({"opacity": 1});
  board.newfeedback.object.toFront();
}
function showFeedbackNoLeft() {
  board.nolfeedback.object.attr({"opacity": 1});
  board.nolfeedback.object.toFront();
}

function showProgress(time) {
   board.background.object.attr({"opacity": 1});
   board.background.object.toFront();
   board.progress[time].object.attr({"opacity": 1});
   board.progress[time].object.toFront();
}

function showHelpPopup() {
    hideLevelPopup();
    board.help.popupRect.show();
    board.help.popupText.show();
    board.help.closeBtn.show();
    board.help.popupRect.toFront();
    board.help.popupText.toFront();
    board.help.closeBtn.toFront();
}

function showLevelPopup() {
    hideHelpPopup();
    board.level.popupRect.show();
    board.level.popupText.show();
    board.level.closeBtn.show();
    board.level.popupRect.toFront();
    board.level.popupText.toFront();
    board.level.closeBtn.toFront();

    // Create dropdown if not already present
    if (!document.getElementById('levelDropdown')) {
        var dropdown = document.createElement('select');
        dropdown.id = 'levelDropdown';
        dropdown.style.position = 'absolute';
        dropdown.style.left = (board.level.popupRect.attr('x') + 30) + 'px';
        dropdown.style.top = (board.level.popupRect.attr('y') + 120) + 'px';
        dropdown.style.fontSize = (board.font_medsize) + 'px';
        dropdown.style.zIndex = 1000;

        var options = ['D1-I1', 'D1-I2', 'D1-I3', 'D1-I4', 'D2-I1', 'D2-I2', 'D2-I3', 'D2-I4', 'D3-I1', 'D3-I2', 'D3-I3', 'D3-I4', 'D4-I1', 'D4-I2', 'D4-I3', 'D4-I4'];
        options.forEach(function(opt) {
            var option = document.createElement('option');
            option.value = opt;
            option.text = opt;
            dropdown.appendChild(option);
        });

        // Default to last option
        dropdown.selectedIndex = options.length - 1;

        // If selectedLevel is defined, set it as selected
        if (typeof selectedLevel !== 'undefined') {
            for (var i = 0; i < options.length; i++) {
                if (options[i] === selectedLevel) {
                    dropdown.selectedIndex = i;
                    break;
                }
            }
        }
        
        document.body.appendChild(dropdown);

        // Create Go button
        var goBtn = document.createElement('button');
        goBtn.id = 'levelGoBtn';
        goBtn.innerText = 'Go';
        goBtn.style.position = 'absolute';
        goBtn.style.left = (board.level.popupRect.attr('x') + 200) + 'px';
        goBtn.style.top = (board.level.popupRect.attr('y') + 120) + 'px';
        goBtn.style.fontSize = (board.font_medsize) + 'px';
        goBtn.style.zIndex = 1000;

        dropdown.style.background = "white";
        dropdown.style.color = "black";
        dropdown.style.border = "2px solid #df8244";
        dropdown.style.borderRadius = "6px";
        dropdown.style.padding = "6px 12px";
        dropdown.style.fontFamily = "Helvetica";
        dropdown.style.fontWeight = "normal";
        dropdown.style.boxShadow = "none"; // Remove shadow 

        goBtn.style.background = "white";
        goBtn.style.color = "black";
        goBtn.style.border = "2px solid #df8244";
        goBtn.style.borderRadius = "6px";
        goBtn.style.padding = "6px 18px";
        goBtn.style.fontFamily = "Helvetica";
        goBtn.style.fontWeight = "normal";
        goBtn.style.cursor = "pointer";

        goBtn.onclick = function() {
            selectedLevel = dropdown.value;
            newGame(); 
        };

        document.body.appendChild(goBtn);
    }
}