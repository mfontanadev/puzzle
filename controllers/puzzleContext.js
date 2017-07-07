PuzzleContext.self = null;

// Activities CONSTANTS
PuzzleContext.C_ACTIVITY_PLAY = 0;

function PuzzleContext() 
{ 
	PuzzleContext.self = this;

	PuzzleContext.prototype.initDefault = function() 
	{
		msglog('INIT CONTEXT:initDefault');
		
		PuzzleContext.self = this;

		this.m_viewParent = null;
	
		this.m_desktop = null;

		this.m_levelSelector = null;
	};
		
	PuzzleContext.prototype.initialize = function (_parentView)
	{
		msglog('INIT CONTEXT:initializeData');
	
		this.initDefault();

		// Data that is shared between all activities.
		this.m_viewParent = _parentView;

		this.m_desktop = new Desktop();
		this.m_desktop.init(this.m_viewParent);

		this.m_levelSelector = new LevelSelector();
        this.m_levelSelector.init(this.m_viewParent, Desktop.C_PLAY_PANEL_WIDTH);
	};

	PuzzleContext.prototype.createActivities = function ()
	{
		// Create activity objetcs and hold them in parent view.
		var result = new Array();

		result.push(new PuzzlePlayActivity(PuzzleContext.C_ACTIVITY_PLAY, this.m_viewParent));
        
		return result;
	};

	this.initDefault();
};

