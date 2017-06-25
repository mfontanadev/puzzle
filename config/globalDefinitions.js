// All sounds used by de app. SoundManager will preload all of them.
var global_sound_definition = [
    {src:"allocated.wav", id:0}
];

// All bitmaps used by de app. ResourceManager will preload all of them.
var global_bitmap_definition = 
[
    'puzzles\\puzzle_peppa_background.png',
    'puzzles\\puzzle_peppa_clip-1.png',
    'puzzles\\puzzle_peppa_clip-2.png',

    'desktop_theme1.png'
];

// Definition of states for the machine of finite states used in app main loop. 
MainLoopState.C_APP_STATE_NOT_SET = 0;
MainLoopState.C_APP_STATE_INTRO = 1;
MainLoopState.C_LOCAL_STORE_NAMESPACE = "puzzle";
function MainLoopState() 
{ 
}

Globals.C_APPLICATION_TITLE_AND_VERSION = 'Puzzle v1.0.3';
function Globals() 
{ 
    this.m_mainLoopState = new MainLoopState(); 

    Globals.prototype.get_MoinLoopState = function()
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


