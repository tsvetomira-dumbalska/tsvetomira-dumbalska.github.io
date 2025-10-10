function generateGrid(width, height, row, col) {
	board.grid = new Array(row);
	board.gridcontent = new Array(row);
	board.characterimg = new Array(row);
	board.goalimg = new Array(row);
	board.obj = new Array(row);

  flag_restart = false;

  var x;
  if (mobile==0){
  var y = board.paper.centre[1] - (width * col / 2);}
  else {
  var y = board.paper.centre[1] - (width * col / 2) - (2/3)*(1.63*1.5*width);

  }
  for(i=0; i<row; i++){

    board.grid[i]         = new Array(col);
    board.gridcontent[i]  = new Array(col);
    board.characterimg[i] = new Array(col);
    board.goalimg[i]      = new Array(col);
    board.obj[i]          = new Array(col);

    x = board.paper.centre[0] - (width * col / 2);

    var border = 3; 

    for(j=0; j<col; j++){
     board.grid[i][j] = {};
     board.grid[i][j].rectangle = {};
     board.grid[i][j].rectangle.rect   = [x,y,width,height];
     board.grid[i][j].rectangle.object = drawRect(board.paper.object,board.grid[i][j].rectangle.rect);
     board.grid[i][j].rectangle.object.attr({"stroke-width":border*scale});
     board.grid[i][j].isfull  = false;
     board.grid[i][j].isgoal  = false;
     board.grid[i][j].iswall  = false;
     board.grid[i][j].grabbed = false;
     board.grid[i][j].type    = 'none';

      // character
      board.characterimg[i][j] = {};
      board.characterimg[i][j].rect = [x+border*scale,y+border*scale,width-2*border*scale,height-2*border*scale];
      board.characterimg[i][j].object = drawImage(board.paper.object, "img/char.png", board.characterimg[i][j].rect);
      board.characterimg[i][j].object.attr({"opacity":0});

      board.obj[i][j] = {};

      x = x + width;
    }
    y = y + height;
  }
  // buttons if on mobile
  if (mobile==1){
    x = board.paper.centre[0];
    y = board.paper.centre[1] + (15)/2*width;

    board.buttons = new Array(4);
    var buttons = new Array(4);
    buttons = ['l','r','u','d'];
    board.buttons.img = {};
    board.buttons.img_clicked = {};
    board.buttons.rect = {};

    for(j=0; j<4; j++){
      board.buttons[j] = {};
    }

    var bheight = 1.5*width;
    board.buttons[0].rect = [x-(bheight*1.62)-(bheight*1.62)/2,y,bheight*1.62,bheight];
    board.buttons[1].rect = [x+(bheight*1.62)-(bheight*1.62)/2,y,bheight*1.62,bheight];
    board.buttons[2].rect = [x-(bheight*1.62)/2,y-(bheight*1.62)/2,bheight*1.62,bheight];
    board.buttons[3].rect = [x-(bheight*1.62)/2,y+(bheight*1.62)/2,bheight*1.62,bheight];

    for(j=0; j<4; j++){
      board.buttons[j].img_clicked = drawImage(board.paper.object, "img/button_" + buttons[j] + "_clicked.png", board.buttons[j].rect);
      board.buttons[j].img_clicked.attr({"opacity":0});
      board.buttons[j].img = drawImage(board.paper.object, "img/button_" + buttons[j] + ".png", board.buttons[j].rect);
      board.buttons[j].img.attr({"opacity":100});
    }
  }
}

function populateGrid(){

	function readFile(file)
	{var f = new XMLHttpRequest();
		f.open("GET", file, false);
		f.onreadystatechange = function ()
		{if(f.readyState === 4)
			{if(f.status === 200 || f.status == 0)
				{var res = f.responseText;
					txtout = res.split('\n').map(function (row) {
						return row.split(',')
					})}}}
					f.send(null);
					return txtout;
				}

  if (flag_restart === false) {
      // draw a random room layout
      layout = Math.floor(Math.random() *50) + 1;
      //rooms = readFile('layout/transfer_' + layout.toString() + '.txt');
    if (typeof selectedLevel === 'string') {
      match = selectedLevel.match(/^D(\d)-I(\d)$/);
      if (match) {
        level_c = parseInt(match[1], 10);
        level_s = parseInt(match[2], 10);
      } else {
        level_c = 4;
        level_s = 4;
      }
    } else {
      level_c = 4;
      level_s = 4;
    }

      rooms = readFile('layout/level-c' + level_c + '-s' + level_s +  '_' + layout.toString() + '.txt');
      }
    else {
      flag_restart = false
    }


row = coding.numrows;
col = coding.numcols;

  for(i=0; i<row; i++){
  	for(j=0; j<col; j++){
  		if ((rooms[i][j])==='-'){
       // wall
       board.grid[i][j].iswall = 1; 
       board.grid[i][j].rectangle.object.attr({"fill":"#999999"});
     }
     else if ((rooms[i][j]).startsWith('t')){
       // teleoprter
       for (m=1; m<ms; m++){
       	if (rooms[i][j]===('t' + m)){
          if (flag_transfer===false){
          if (parameters.img_tool=='c') {
       		  board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_teleporter, board.characterimg[i][j].rect);
       		} else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_teleporter  + order[m] + '.png', board.characterimg[i][j].rect);
          }
        } else {
          if (parameters.img_tool=='s') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_teleporter_t, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_teleporter_t  + order[m] + '.png', board.characterimg[i][j].rect);
          }
          }
          board.obj[i][j].object.attr({"opacity":1});
       		board.grid[i][j].isfull = true;
       		board.grid[i][j].type   = rooms[i][j];
       	}
       }
     }
     else if ((rooms[i][j]).startsWith('d')){
       // door
       for (m=1; m<ms; m++){
       	if (rooms[i][j]===('d' + m)){
       		if (flag_transfer===false){
          if (parameters.img_tool=='c') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_door, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_door  + order[m] + '.png', board.characterimg[i][j].rect);
          }
        } else {
          if (parameters.img_tool=='s') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_door_t, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_door_t  + order[m] + '.png', board.characterimg[i][j].rect);
          }
          }
          board.obj[i][j].object.attr({"opacity":1});
       		board.grid[i][j].isfull = true;
       		board.grid[i][j].type   = rooms[i][j];
       		board.grid[i][j].iswall = 1; 
       	}
       }
     }
     else if ((rooms[i][j]).startsWith('k')){
       // key
       for (m=1; m<ms; m++){
       	if (rooms[i][j]===('k' + m)){
       		if (flag_transfer===false){
          if (parameters.img_tool=='c') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_key, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_key  + order[m] + '.png', board.characterimg[i][j].rect);
          }
        } else {
          if (parameters.img_tool=='s') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s' + order[m] + parameters.img_key_t, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_key_t  + order[m] + '.png', board.characterimg[i][j].rect);
          }
          }
          board.obj[i][j].object.attr({"opacity":1});
       		board.grid[i][j].isfull = true;
       		board.grid[i][j].type   = rooms[i][j];
       	}
       }
     }
     else if ((rooms[i][j]).startsWith('c')){
       // catapult
       for (m=1; m<ms; m++){
       	if (rooms[i][j]===('c' + m)){
       		if (flag_transfer===false){
          if (parameters.img_tool=='c') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_catapult, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_catapult  + order[m] + '.png', board.characterimg[i][j].rect);
          }
        } else {
          if (parameters.img_tool=='s') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_catapult_t, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_catapult_t  + order[m] + '.png', board.characterimg[i][j].rect);
          }
          }
          board.obj[i][j].object.attr({"opacity":1});
       		board.grid[i][j].isfull = true;
       		board.grid[i][j].type   = rooms[i][j];
       	}
       }
     }
     else if ((rooms[i][j]).startsWith('l')){
       // lever
       for (m=1; m<ms; m++){
        if (rooms[i][j]===('l' + m)){
          if (flag_transfer===false){
          if (parameters.img_tool=='c') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_lever, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_lever  + order[m] + '.png', board.characterimg[i][j].rect);
          }
        } else {
          if (parameters.img_tool=='s') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_lever_t, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_lever_t  + order[m] + '.png', board.characterimg[i][j].rect);
          }
          }
          board.obj[i][j].object.attr({"opacity":1});
          board.grid[i][j].isfull = true;
          board.grid[i][j].type   = rooms[i][j];
        }
       }
     }
     else if ((rooms[i][j]).startsWith('p')){
       // portal
       for (m=1; m<ms; m++){
        if (rooms[i][j]===('p' + m)){
          if (flag_transfer===false){
          if (parameters.img_tool=='c') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_portal, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_portal  + order[m] + '.png', board.characterimg[i][j].rect);
          }
        } else {
          if (parameters.img_tool=='s') {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/s'  + order[m] + parameters.img_portal_t, board.characterimg[i][j].rect);
          } else {
            board.obj[i][j].object  = drawImage(board.paper.object, 'img/shapes/' + parameters.img_portal_t  + order[m] + '.png', board.characterimg[i][j].rect);
          }
          }
          board.obj[i][j].object.attr({"opacity":1});
          board.grid[i][j].isfull = true;
          board.grid[i][j].type   = rooms[i][j];
          board.grid[i][j].iswall = 1; 
        }
       }
     }
     else if ((rooms[i][j])==='i'){
	   // character
	   coding.xloc = j;
	   coding.yloc = i;
	   board.characterimg[coding.yloc][coding.xloc].object.attr({"opacity":1});
  }
  else if ((rooms[i][j])==='x'){
        // goal
        board.goalimg[i][j] = {};
        board.goalimg[i][j].object = drawImage(board.paper.object, "img/goal.png", board.characterimg[i][j].rect);
        board.goalimg[i][j].object.attr({"opacity":1});
        board.grid[i][j].isgoal = true;
      }
    }
  }
  
}

function resetGrid(){


	coding.xloc = 0;
	coding.yloc = 0;
	for (i=0; i<coding.numrows; i++){
		for(j=0; j<coding.numcols; j++){
			board.characterimg[i][j].object.attr({"opacity":0});
			board.grid[i][j].grabbed = false;
			board.grid[i][j].type = 'none';
			if (board.grid[i][j].isgoal){
				board.goalimg[i][j].object.remove();
				board.grid[i][j].isgoal = false;
			} 
			if (board.grid[i][j].isfull){
				board.obj[i][j].object.remove();
				board.grid[i][j].isfull = false;
      }
      if (board.grid[i][j].iswall){
       board.grid[i][j].iswall = false; 
       board.grid[i][j].rectangle.object.attr({"fill":"white"});
     }
   }
 }
 populateGrid();
}



