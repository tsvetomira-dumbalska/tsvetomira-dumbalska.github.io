
var sdata;
var edata;
var parameters;
var board;
var coding;

function setExperiment() {



ms = 12+1;
  // EDATA ----------------
  edata = {};
  // expt
  edata.expt_subject = participant_id;
  edata.expt_sex     = participant_gender;
  edata.expt_age     = participant_age;
  edata.expt_task    = participant_task;
  edata.expt_turker  = participant_turker;

  // PARAMETERS -----------
  parameters = {};

  //time outs (check)
  parameters.response_timeout =  2000;  // response time
  parameters.warnings_timeout = 20000;  // response warning time
  parameters.feedpos_timeout  =   400;  // feedback time (good)
  parameters.feedneg_timeout  =  2000;  // feedback time (bad)

  // numbers
  parameters.nb_trials        =   80;//80; 
  parameters.nb_transfer      =   0;

  // version
  //mobile = JSON.parse("[" + getQueryParams().m + "]");
  parameters.mobile = mobile;

  // first 5 trials
  tool_arr = [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4];
  tool_arr = shuffle(tool_arr);

  parameters.tool_arr = tool_arr;

  // image mappings
  order = Array.from(Array(ms).keys()).slice(1);
  order = [1,2,7,5,3,6,15,8,22,14,9,4,13,21]
  
  // if we want to randomize shapes/colors between pairs/tools
  parameters.img_tool = 's';
  parameters.img_pair = 'c';
  // or don't randomize shapes/colors
  //parameters.img_tool = 's';
  //parameters.img_pair = 'c';



  if (parameters.img_tool=='s') {
    parameters.img_teleporter = 's'+ 7 +'_c';
    parameters.img_key        = 's'+ 8 +'_c';
    parameters.img_door       = 's'+ 12 +'_c';
    parameters.img_catapult   = 's'+ 9 +'_c';
    parameters.img_lever      = 's'+ 11 +'_c';
    parameters.img_portal     = 's'+ 6+'_c';

    parameters.img_teleporter_t = '_c'+1+'.png';
    parameters.img_key_t        = '_c'+2+'.png';
    parameters.img_door_t       = '_c'+13+'.png';
    parameters.img_catapult_t   = '_c'+5+'.png';
    parameters.img_lever_t      = '_c'+ 23+'.png';
    parameters.img_portal_t     = '_c'+ 6+'.png';

} else {
    parameters.img_teleporter = '_c'+ order[1]+'.png';
    parameters.img_key        = '_c'+ order[2]+'.png';
    parameters.img_door       = '_c'+ order[3]+'.png';
    parameters.img_catapult   = '_c'+ order[4]+'.png';
    parameters.img_lever      = '_c'+ order[5]+'.png';
    parameters.img_portal     = '_c'+ order[6]+'.png';

    parameters.img_teleporter_t = 's'+order[7]+'_c';
    parameters.img_key_t        = 's'+order[8]+'_c';
    parameters.img_door_t       = 's'+order[9]+'_c';
    parameters.img_catapult_t   = 's'+order[10]+'_c';
    parameters.img_lever_t      = 's'+ order[11]+'_c';
    parameters.img_portal_t     = 's'+ order[0]+'_c';
}


  // SDATA ----------------
  sdata = {};
  // expt
  sdata.expt_index        = [];
  sdata.expt_trial        = [];
  sdata.trial_layout      = [];
  sdata.trial_level       = [];
  sdata.trial_solved      = [];
  sdata.trial_attempts    = [];
  sdata.trial_game        = [];
  sdata.trial_transfer    = [];
  sdata.trial_test        = [];

  sdata.game              = [];
  sdata.game_solved       = [];
  sdata.game_layout       = []; 
  sdata.game_level        = []; 
  sdata.game_attempts     = [];
  sdata.game_transfer     = [];
  sdata.game_test         = [];

  sdata.test_index        = [];
  sdata.test_solved       = [];
  sdata.test_layout       = [];

  sdata.RPM               = [];

  // resp
  sdata.resp              = {};
  // BOARD ----------------
  board = {};

  // CODING ---------------
  coding = {};
  // index
  coding.index  = -1;
  coding.trial  = 0;
  coding.game   = -1;
  coding.test   = -1;
  coding.layout = []; 

/*
  layouts = [];

  for (var i = 1; i<5; i++){
    for (var j=1; j<16; j++) {
      layouts.push('c' + i +'_' + j  + ".txt");
    }
  }
  layouts = shuffle(layouts);
*/

  // counts
  coding.attempts      = 0;
  coding.level         = 5;
  // other
  coding.answering = false;
  coding.timestamp = NaN;
  // location
  coding.xloc = 0;
  coding.yloc = 0;


  flag_restart  = false;
  flag_test     = false;
  flag_transfer = false;
  flag_progress = false;

}






