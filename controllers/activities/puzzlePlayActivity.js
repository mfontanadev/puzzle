PuzzlePlayActivity.self = null;

function PuzzlePlayActivity(_id, _viewParent) 
{ 
	PuzzlePlayActivity.self = this;

	this.m_id = _id;
	this.m_viewParent = _viewParent; 

	this.m_flow = null;
};

PuzzlePlayActivity.prototype.getActivityName = function ()
{   
	return "PuzzlePlayActivity";
}

PuzzlePlayActivity.prototype.initialize = function ()
{   
	console.log(this.getActivityName());

	this.m_flow = new PlayFlow();
	this.m_flow.init(this.m_viewParent, this);

	this.createControls();
};

PuzzlePlayActivity.prototype.createControls = function ()
{
    var tmpCanvas = this.m_viewParent.m_canvasEx;
};

PuzzlePlayActivity.prototype.onEnterActivity = function ()
{
	this.m_flow.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING);
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
	PuzzlePlayActivity.self.m_viewParent.navigateTo(PuzzleContext.C_ACTIVITY_MENU);    
};

PuzzlePlayActivity.prototype.onLeaveActivity = function ()
{
};
