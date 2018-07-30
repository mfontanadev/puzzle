PuzzleLevelsActivity.self = null;

function PuzzleLevelsActivity(_id) 
{ 
	PuzzleLevelsActivity.self = this;

	this.m_id = _id;
	this.m_flow = null;
};

PuzzleLevelsActivity.prototype.getActivityName = function ()
{   
	return "PuzzleLevelsActivity";
}

PuzzleLevelsActivity.prototype.initialize = function ()
{   
	msglog(this.getActivityName());

	this.m_flow = new LevelsFlow();
	this.m_flow.init(this);

	this.createControls();
};

PuzzleLevelsActivity.prototype.createControls = function ()
{
};

PuzzleLevelsActivity.prototype.onEnterActivity = function ()
{
	this.m_flow.onEnterFlow();
};

PuzzleLevelsActivity.prototype.handleInputs = function ()
{
	this.m_flow.handleInputs();
};

PuzzleLevelsActivity.prototype.implementGameLogic = function ()
{
	this.m_flow.implementGameLogic();
};

PuzzleLevelsActivity.prototype.render = function ()
{
	this.m_flow.render();

	this.renderControls();
};

PuzzleLevelsActivity.prototype.renderControls = function ()
{
};

PuzzleLevelsActivity.prototype.btnBack_controller = function (_e, _sender)
{
	viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_MENU);    
};

PuzzleLevelsActivity.prototype.onLeaveActivity = function ()
{
	this.m_flow.onLeaveFlow();
};
