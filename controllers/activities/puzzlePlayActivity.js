PuzzlePlayActivity.self = null;

function PuzzlePlayActivity(_id) 
{ 
	PuzzlePlayActivity.self = this;

	this.m_id = _id;
	this.m_flow = null;
};

PuzzlePlayActivity.prototype.getActivityName = function ()
{   
	return "PuzzlePlayActivity";
}

PuzzlePlayActivity.prototype.initialize = function ()
{   
	msglog(this.getActivityName());

	this.m_flow = new PlayFlow();
	this.m_flow.init(this);

	this.createControls();
};

PuzzlePlayActivity.prototype.createControls = function ()
{
};

PuzzlePlayActivity.prototype.onEnterActivity = function ()
{
};

PuzzlePlayActivity.prototype.handleInputs = function ()
{
	this.m_flow.handleInputs();
};

PuzzlePlayActivity.prototype.implementGameLogic = function ()
{
	this.m_flow.implementGameLogic();
};

PuzzlePlayActivity.prototype.render = function ()
{
	this.m_flow.render();

	this.renderControls();
};

PuzzlePlayActivity.prototype.renderControls = function ()
{
};

PuzzlePlayActivity.prototype.btnBack_controller = function (_e, _sender)
{
	viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_MENU);    
};

PuzzlePlayActivity.prototype.onLeaveActivity = function ()
{
};
