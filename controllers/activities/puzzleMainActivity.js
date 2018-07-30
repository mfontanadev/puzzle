PuzzleMainActivity.self = null;

function PuzzleMainActivity(_id) 
{ 
	PuzzleMainActivity.self = this;

	this.m_id = _id;
	this.m_flow = null;
};

PuzzleMainActivity.prototype.getActivityName = function ()
{   
	return "PuzzleMainActivity";
}

PuzzleMainActivity.prototype.initialize = function ()
{   
	msglog(this.getActivityName());

	this.m_flow = new MainFlow();
	this.m_flow.init(this);

	this.createControls();
};

PuzzleMainActivity.prototype.createControls = function ()
{
};

PuzzleMainActivity.prototype.onEnterActivity = function ()
{
	this.m_flow.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_MAIN);
	this.m_flow.onEnterFlow();
};

PuzzleMainActivity.prototype.handleInputs = function ()
{
	this.m_flow.handleInputs();
};

PuzzleMainActivity.prototype.implementGameLogic = function ()
{
	this.m_flow.implementGameLogic();
};

PuzzleMainActivity.prototype.render = function ()
{
	this.m_flow.render();

	this.renderControls();
};

PuzzleMainActivity.prototype.renderControls = function ()
{
};

PuzzleMainActivity.prototype.btnBack_controller = function (_e, _sender)
{
	viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_MENU);    
};

PuzzleMainActivity.prototype.onLeaveActivity = function ()
{
	this.m_flow.onLeaveFlow();
};
