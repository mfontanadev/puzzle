PuzzleContext.self = null;

// Activities CONSTANTS
PuzzleContext.C_ACTIVITY_MAIN = 0;
PuzzleContext.C_ACTIVITY_LEVELS = 1;
PuzzleContext.C_ACTIVITY_PLAY = 2;

function PuzzleContext() 
{ 
	PuzzleContext.self = this;

	PuzzleContext.prototype.initDefault = function() 
	{
		msglog('INIT CONTEXT:initDefault');
		
		PuzzleContext.self = this;
	
		this.m_desktop = null;

		this.m_levelSelector = null;

		this.m_levels_count = 0;
	};
		
	PuzzleContext.prototype.initialize = function (_parentView)
	{
		msglog('INIT CONTEXT:initializeData');
	
		this.initDefault();

		// Data that is shared between all activities.
		this.m_desktop = new Desktop();
		this.m_desktop.init();

		this.m_levelSelector = new LevelSelectorPanel();
		this.m_levelSelector.init(  0, 0,
									viewMngr.getWidth(),
									viewMngr.getHeight()
		);

		this.m_levels_count = 5;
	};

	PuzzleContext.prototype.createActivities = function ()
	{
		// Create activity objetcs and hold them in parent view.
		var result = new Array();

		result.push(new PuzzleMainActivity(PuzzleContext.C_ACTIVITY_MAIN));
		result.push(new PuzzleLevelsActivity(PuzzleContext.C_ACTIVITY_LEVELS));
		result.push(new PuzzlePlayActivity(PuzzleContext.C_ACTIVITY_PLAY));
        
		return result;
	};

	this.initDefault();
};

