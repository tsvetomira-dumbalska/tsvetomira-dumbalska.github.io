
function runExperiment(){
  board = {};
  // mobile = 0;  //mobile-friendly or web-version
  //mobile = JSON.parse("[" + getQueryParams().m + "]");

  // BOARD
  // paper (paper)
  board.paper = {};
  board.paper.width  = window.innerWidth;
  board.paper.height = window.innerHeight;
  board.paper.centre = [0.5*window.innerWidth , 0.5*window.innerHeight];
  board.paper.rect   = [0,0,board.paper.width,board.paper.height];
  board.paper.object = drawPaper(board.paper.rect);

  board.background = {};
  board.background.width  = window.innerWidth;
  board.background.height = window.innerHeight;
  board.background.rect   = [0, 0,board.background.width,board.background.height];
  board.background.object = drawRect(board.paper.object, board.background.rect);
  board.background.object.attr({"fill": "white"});
  board.background.object.attr({"opacity": 0});
  board.background.object.toBack();
  
  // APPEARANCE
  x = board.paper.centre[0];
  y = board.paper.centre[1];
  // size scaling
  if (board.paper.centre[0]>board.paper.centre[1]) { //assume that if wider than longer, then computer
    scale = board.paper.centre[1]/9/53;}
  else {
    //scale = board.paper.centre[0]/6/53; //assume that if longer than wider, then mobile
    scale = board.paper.centre[0]/8/53;
    if (board.paper.centre[1]<(8*scale*53)){ //(board.paper.centre[1]<(6*scale*53)){
  scale = board.paper.centre[1]/10/53;
    }}
  // fonts
  board.font_bigsize   = 50*scale;
  board.font_medsize   = 20*scale;
  board.font_tinysize  = 12*scale;

   // FEEDBACK

    if (mobile==1) {
    var rect = [x-scale*200,4.2/5*y-scale*90,scale*400,scale*180];
  } else{
      var rect = [x-scale*200,y-scale*90,scale*400,scale*180];
  }
  // success feedback
  board.posfeedback = {};
  board.posfeedback.object  = drawImage(board.paper.object, "img/f_success.png", rect);
  // restart feedback
  board.resfeedback = {};
  board.resfeedback.object = drawImage(board.paper.object, "img/f_restart.png", rect);
  // no attempts left feedback
  board.nolfeedback = {};
  board.nolfeedback.object = drawImage(board.paper.object, "img/f_noleft.png", rect);
  // new game feedback
  board.newfeedback = {};
  board.newfeedback.object = drawImage(board.paper.object, "img/f_new.png", rect);
  hideFeedback();

  // PROGRESS

var rect = [x-scale*200,y-scale*90,scale*400,scale*180];

  if (mobile==1) {
    mob_img = 'mob';
  } else {
    mob_img = '';
  }



  //GRID
  coding.numrows = 15;
  coding.numcols = 15;
  if (mobile==1) {
  width = 53;} else{width = 45;}
  generateGrid(scale*width, scale*width, coding.numrows, coding.numcols);

  // INSTRUCTIONS
  board.dl = {};
  board.dr = {};
  board.dm = {};
  board.uc = {};
    
  if (mobile==0) {
    board.uc.centre  = [board.paper.centre[0], board.paper.centre[1] - scale*width*(coding.numrows/3) - (2/3)*(1.62*1.5*scale*width) - 2.2*board.font_bigsize];
    
    board.dr.centre = [board.paper.centre[0]+scale*width*Math.ceil(coding.numrows/3), board.paper.centre[1]-scale*width*Math.ceil(coding.numrows/2)];
    board.dl.centre = [board.paper.centre[0]-scale*width*Math.ceil(coding.numrows/3), board.paper.centre[1]-scale*width*Math.ceil(coding.numrows/2)];
    //board.dm.centre = [board.paper.centre[0], board.paper.centre[1]+scale*width*Math.ceil(coding.numrows/2)];
    //board.dr.centre = [board.paper.centre[0], board.paper.centre[1]-scale*width*Math.ceil(coding.numrows/2)];
    board.dr.text   = "n = new game";
    board.dl.text   = "r = restart";
    key_dr = "n = ";
    key_dl = "r = ";

    //board.dm.text   = "attempt: 1/3";
    //board.dm.object = drawText(board.paper.object,board.dm.centre, board.dm.text);
    //board.dm.object.attr({"font-size": board.font_medsize});
    //board.dm.object.attr({"text-anchor": "centre"});
    }
    else {
      board.uc.centre  = [board.paper.centre[0], board.paper.centre[1] - scale*width*(coding.numrows/3) - 3*(2/3)*(1.62*1.5*scale*width) - 2.2*board.font_bigsize];
    
      board.dr.centre = [board.paper.centre[0]+scale*width*Math.ceil(coding.numrows/3), board.paper.centre[1] - scale*width*(coding.numrows/3) - 3*(2/3)*(1.62*1.5*scale*width) - 0.5*board.font_bigsize];
      board.dl.centre = [board.paper.centre[0]-scale*width*Math.ceil(coding.numrows/3), board.paper.centre[1] - scale*width*(coding.numrows/3) - 3*(2/3)*(1.62*1.5*scale*width) - 0.5*board.font_bigsize];
      board.dl.text   = "restart";
      //board.dr.centre = [board.paper.centre[0], board.paper.centre[1]-scale*width*Math.ceil(coding.numrows/2)- 0.5*(1.63*1.5*width) - 0.5*board.font_medsize];
      board.dr.text   = "new game";
      key_dr = "";
    key_dl = "";
    }



  op_dl = 1;
  board.uc.text   = "Game 1/80";
  board.dl.object = drawText(board.paper.object,board.dl.centre, board.dl.text);
  board.dl.object.attr({"font-size": board.font_medsize});
  board.dl.object.attr({"text-anchor": "left"});
  board.dl.object.attr({"font-family": '"Courier"'});
  board.dl.object.attr({"font-weight": "bold"});
  board.dl.object.attr({"opacity": op_dl});
  board.dr.object = drawText(board.paper.object,board.dr.centre, board.dr.text);
  board.dr.object.attr({"font-size": board.font_medsize});
  board.dr.object.attr({"text-anchor": "right"});
  board.dr.object.attr({"font-family": '"Courier"'});
  board.dr.object.attr({"font-weight": "bold"});
  board.dr.object.attr({"opacity": op_dl});
  board.uc.object = drawText(board.paper.object,board.uc.centre, board.uc.text);
  board.uc.object.attr({"font-size": board.font_bigsize});
  board.uc.object.attr({"font-family": '"Courier"'});
  board.uc.object.attr({"font-weight": "bolder"});
  board.uc.object.attr({"stroke": "#df8244"});
  board.uc.object.attr({"fill": "#f1ccb0"});
  board.uc.object.attr({"stroke-width": "1.7"});
  board.uc.object.attr({"text-anchor": "centre"});


    if (mobile == 1) {
      // Draw rectangle around "Restart" text
      restartBBox = board.dl.object.getBBox();
      var restartRect = drawRect(board.paper.object, [
        restartBBox.x-10, 
        board.dl.centre[1] - 1.25*board.font_medsize, 
        restartBBox.width+20, 
        2.5*board.font_medsize
      ]);
      restartRect.attr({"stroke-width": 2, "r": 7});
      restartRect.click(restartGame);
    
      // Draw rectangle around "New Game" text
      newGameBBox = board.dr.object.getBBox();
      var newGameRect = drawRect(board.paper.object, [
        newGameBBox.x-10, 
        board.dr.centre[1] - 1.25*board.font_medsize, 
        newGameBBox.width+20,  
        2.5*board.font_medsize
      ]);
      newGameRect.attr({"stroke-width": 2, "r": 7});
      newGameRect.click(newGame);
    }

  // RESPONSES
  if (mobile==0) {
    jwerty.key('←',handleLeft);
    jwerty.key('→',handleRight);
    jwerty.key('↑',handleUp);
    jwerty.key('↓', handleDown);
    jwerty.key('r',restartGame);
    jwerty.key('n',newGame);}
    else {
      board.dl.object.click(restartGame);
      board.dr.object.click(newGame);
      board.buttons[0].img.click(handleLeft);
      board.buttons[1].img.click(handleRight);
      board.buttons[2].img.click(handleUp);
      board.buttons[3].img.click(handleDown);
}

  // HELP BUTTON
  board.help = {};
  var helpRadius = 25 * scale;
  var helpX = board.paper.width - helpRadius - 20;
  var helpY = helpRadius + 20;
  board.help.circle = board.paper.object.circle(helpX, helpY, helpRadius)
    .attr({ fill: "#f1ccb0", stroke: "#df8244", "stroke-width": 2, cursor: "pointer" });
  board.help.text = board.paper.object.text(helpX, helpY, "?")
    .attr({ "font-size": helpRadius * 1.2, "font-family": "Courier",  "fill": "#df8244", "font-weight": "bold", "text-anchor": "middle", "dominant-baseline": "middle", cursor: "pointer" });

  // HELP POPUP (hidden by default)
  // HELP POPUP (hidden by default)
  var popupWidth = 400 * scale;
  var popupHeight = 220 * scale;
  var popupX = board.paper.width - popupWidth - 40;
  var popupY = 40;
  board.help.popupRect = board.paper.object.rect(popupX, popupY, popupWidth, popupHeight, 15)
    .attr({ fill: "#fffbe6", stroke: "#df8244", "stroke-width": 2, opacity: 0.98 }).hide();

  // Use drawText for better positioning and wrapping
  var rulesText = "\n\n\n\n- Your goal is to reach the gift icon.\n- Use arrow keys to move.\n- Press 'r' to restart, 'n' for new game. \n - Click : to change the level.";
  board.help.popupText = drawText(
    board.paper.object,
    [popupX + 20, popupY + 40], // X, Y inside the rectangle
    rulesText,
    popupWidth - 40 // max width for wrapping
  ).attr({
    "font-size": board.font_medsize,
    "font-family": "Helvetica",
    "text-anchor": "start",
    "dominant-baseline": "text-before-edge" 
  }).hide();

  board.help.closeBtn = board.paper.object.text(popupX + popupWidth - 30, popupY + 30, "✕")
    .attr({ "font-size": scale*1.5*board.font_medsize, "font-family": "Courier", "font-weight": "bold", cursor: "pointer", fill: "#df8244" }).hide();

  // Show popup on help button click
  board.help.circle.click(showHelpPopup);
  board.help.text.click(showHelpPopup);

  // Hide popup on close button click
  board.help.closeBtn.click(hideHelpPopup);

  // Optional: Hide popup if user clicks outside popup
  board.background.object.click(function() {
    hideHelpPopup();
  });

  // LEVEL BUTTON (left-hand side)
  board.level = {};
  var levelRadius = 25 * scale;
  var levelX = levelRadius + 20;
  var levelY = levelRadius + 20;
  board.level.circle = board.paper.object.circle(levelX, levelY, levelRadius)
    .attr({ fill: "#f1ccb0", stroke: "#df8244", "stroke-width": 2, cursor: "pointer" });
  board.level.text = board.paper.object.text(levelX, levelY, ":")
    .attr({ "font-size": levelRadius * 1.2, "font-family": "Courier", "fill": "#df8244", "font-weight": "bold", "text-anchor": "middle", "dominant-baseline": "middle", cursor: "pointer" });

  // LEVEL POPUP (hidden by default)
  var levelPopupWidth = 400 * scale;
  var levelPopupHeight = 220 * scale;
  var levelPopupX = 40;
  var levelPopupY = 40;
  board.level.popupRect = board.paper.object.rect(levelPopupX, levelPopupY, levelPopupWidth, levelPopupHeight, 15)
    .attr({ fill: "#fffbe6", stroke: "#df8244", "stroke-width": 2, opacity: 0.98 }).hide();

  var levelText = "\n\n Select level:";
  board.level.popupText = drawText(
    board.paper.object,
    [levelPopupX + 20, levelPopupY + 40],
    levelText,
    levelPopupWidth - 40
  ).attr({
    "font-size": board.font_medsize,
    "font-family": "Helvetica",
    "text-anchor": "start",
    "dominant-baseline": "text-before-edge"
  }).hide();

  board.level.closeBtn = board.paper.object.text(levelPopupX + levelPopupWidth - 30, levelPopupY + 30, "✕")
    .attr({ "font-size": scale*1.5*board.font_medsize, "font-family": "Courier", "font-weight": "bold", cursor: "pointer", fill: "#df8244" }).hide();

  // Show popup on level button click
  board.level.circle.click(showLevelPopup);
  board.level.text.click(showLevelPopup);

  // Hide popup on close button click
  board.level.closeBtn.click(hideLevelPopup);

  // Optional: Hide popup if user clicks outside popup
  board.background.object.click(function() {
    hideLevelPopup();
    hideHelpPopup(); // Also hide help popup if open
  });



  // START
  nextTrial();
}
