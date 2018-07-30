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

    'puzzles\\03\\puzzle_peppa3_background.png',
    'puzzles\\03\\puzzle_peppa3_clip-1.png',
    'puzzles\\03\\puzzle_peppa3_clip-2.png',
    'puzzles\\03\\puzzle_peppa3_clip-3.png',
    'puzzles\\03\\puzzle_peppa3_clip-4.png',

    'puzzles\\04\\puzzle_peppa4_background.png',
    'puzzles\\04\\puzzle_peppa4_clip-1.png',
    'puzzles\\04\\puzzle_peppa4_clip-2.png',
    'puzzles\\04\\puzzle_peppa4_clip-3.png',
    'puzzles\\04\\puzzle_peppa4_clip-4.png',
    'puzzles\\04\\puzzle_peppa4_clip-5.png',

    'puzzles\\05\\puzzle_peppa5_background.png',
    'puzzles\\05\\puzzle_peppa5_clip-1.png',
    'puzzles\\05\\puzzle_peppa5_clip-2.png',
    'puzzles\\05\\puzzle_peppa5_clip-3.png',
    'puzzles\\05\\puzzle_peppa5_clip-4.png',

    'desktop_screen.png',
    'main_screen.png',

    'main_background.png',

    'play_up.png',
    'play_down.png',

    'titleLevelSelector_up.png',
    'titleLevelSelector_down.png',
    'thumbail_background.png',

    'ok_up.png',
    'ok_down.png',
    'back_up.png',
    'back_down.png',
    'home_up.png',
    'home_down.png',
    'toolbar_background.png',
    'level_finished_spa.png',
    'level_finished_eng.png',
    'left_up.png',
    'left_down.png',
    'right_up.png',
    'right_down.png',
    'background_green.jpg',
    'star_down.png',
    'star_up.png',
    'close_padlock.png',
    'open_padlock.png'
];

// Definition of states for the machine of finite states used in app main loop. 
MainLoopState.C_APP_STATE_NOT_SET = 0;
MainLoopState.C_APP_STATE_INTRO = 1;
MainLoopState.C_APP_STATE_MAIN = 2;
MainLoopState.C_APP_STATE_LEVEL_SELECTION = 3;
MainLoopState.C_APP_STATE_PLAYING = 4;
MainLoopState.C_LOCAL_STORE_NAMESPACE = "puzzle";
function MainLoopState() 
{ 
}

Globals.C_APPLICATION_TITLE_AND_VERSION = 'Puzzle v1.4.3';
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


