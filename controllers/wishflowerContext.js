WishflowerContext.self = null;

// Activities CONSTANTS
WishflowerContext.C_ACTIVITY_PLAY = 0;

// Entities CONSTANTS
WishflowerContext.C_LADYBUG_SCALE = 0.1;

function WishflowerContext() 
{ 
	WishflowerContext.self = this;

	WishflowerContext.prototype.initDefault = function() 
	{
		msglog('INIT CONTEXT:initDefault');
		
		WishflowerContext.self = this;

		this.m_viewParent = null;
	
		this.m_desktop = null;
	};
		
	WishflowerContext.prototype.initialize = function (_parentView)
	{
		msglog('INIT CONTEXT:initializeData');
	
		this.initDefault();

		// Data that is shared between all activities.
		this.m_viewParent = _parentView;

		this.m_desktop = new Desktop();
		this.m_desktop.init(this.m_viewParent);
	};

	WishflowerContext.prototype.createActivities = function ()
	{
		// Create activity objetcs and hold them in parent view.
		var result = new Array();

		result.push(new WishflowerPlayActivity(WishflowerContext.C_ACTIVITY_PLAY, this.m_viewParent));
        
		return result;
	};

	this.initDefault();
};

