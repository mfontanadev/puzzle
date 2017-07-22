// All sounds used by de app. SoundManager will preload all of them.
var global_sound_definition = [
    {src:"allocated.wav", id:0},
    {src:"level_finished.wav", id:1}
];

// All bitmaps used by de app. ResourceManager will preload all of them.
var global_bitmap_definition = 
[
    'puzzles\\01\\puzzle_peppa_background.png',
    'puzzles\\01\\puzzle_peppa_clip-1.png',
    'puzzles\\01\\puzzle_peppa_clip-2.png',

    'puzzles\\02\\puzzle_peppa2_background.png',
    'puzzles\\02\\puzzle_peppa2_clip-1.png',
    'puzzles\\02\\puzzle_peppa2_clip-2.png',
    'puzzles\\02\\puzzle_peppa2_clip-3.png',
    'puzzles\\02\\puzzle_peppa2_clip-4.png',

    'desktop_theme1.png',

    'ok_up.png',
    'ok_down.png',
    'back_up.png',
    'back_down.png',
    'toolbar_open_up.png',
    'toolbar_open_down.png',
    'toolbar_background.png',
    'level_finished_spa.png',
    'level_finished_eng.png',
    'left_up.png',
    'left_down.png',
    'right_up.png',
    'right_down.png'
];

// Definition of states for the machine of finite states used in app main loop. 
MainLoopState.C_APP_STATE_NOT_SET = 0;
MainLoopState.C_APP_STATE_INTRO = 1;
MainLoopState.C_LOCAL_STORE_NAMESPACE = "puzzle";
function MainLoopState() 
{ 
}

Globals.C_APPLICATION_TITLE_AND_VERSION = 'Puzzle v1.3.1';
function Globals() 
{ 
    this.m_mainLoopState = new MainLoopState(); 

    Globals.prototype.get_MainLoopState = function()
    {
        return this.m_mainLoopState;
    }

	Globals.prototype.get_C_APPLICATION_TITLE_AND_VERSION = function()
	{
		return Globals.C_APPLICATION_TITLE_AND_VERSION;
	}
}

if (typeof module !== 'undefined' && module !== null)
{
	module.exports = Globals;
}


