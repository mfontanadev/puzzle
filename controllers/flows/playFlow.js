PlayFlow.C_PLAY_FLOW_APPSTATE_NOT_SET = -1;
PlayFlow.C_PLAY_FLOW_APPSTATE_INITIALIZING = 0;
PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING = 1;

function PlayFlow() 
{
    this.m_viewParent = null;
    this.m_activity = null;

    this.m_desktop = null;

    this.m_state = PlayFlow.C_PLAY_FLOW_NOT_SET;

    PlayFlow.prototype.init = function (_viewParent) 
    {
        this.m_viewParent = _viewParent;
        this.m_activity = _viewParent.getCurrentActivity();
        
        this.m_desktop = _viewParent.getDataContext().m_desktop;
    };

    PlayFlow.prototype.handleInputs = function ()
    {
        if (this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING ||
            this.m_state === PlayFlow.C_PLAY_ERROR_DESCRIPTION)
        {
        }
    };

    PlayFlow.prototype.implementGameLogic = function () 
    {
        this.m_desktop.implementGameLogic();
    };

    PlayFlow.prototype.render = function () 
    {
        this.m_desktop.render();
    };

    PlayFlow.prototype.setState = function (_state) 
    {
        this.m_state = _state;
    };
};



