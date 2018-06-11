PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING = 0;
PlayFlow.C_PLAY_FLOW_APPSTATE_SELECTING_LEVELS = 2;
PlayFlow.C_PLAY_FLOW_APPSTATE_NEXT_LEVEL_CONFIRMATION = 3;

PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_CLIC = 101;
PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK = 102;
PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_NEXT_LEVEL = 103;
PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_PREVIOUS_LEVEL = 104;

function PlayFlow() 
{
    this.m_viewParent = null;
    this.m_activity = null;

    this.m_desktop = null;

    this.m_state = null;

    PlayFlow.prototype.init = function (_viewParent) 
    {
        this.m_viewParent = _viewParent;
        this.m_activity = _viewParent.getCurrentActivity();
        
        this.m_desktop = _viewParent.getDataContext().m_desktop;
        this.m_desktop.registerObserver(this);

        this.m_levelSelector = _viewParent.getDataContext().m_levelSelector;
        this.m_levelSelector.registerObserver(this);

        this.m_state = PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING;
    };

    PlayFlow.prototype.handleInputs = function ()
    {
        this.m_desktop.handleInputs();
    };

    PlayFlow.prototype.implementGameLogic = function () 
    {
        if (this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING)
        {
            this.m_desktop.implementGameLogic();
        }
        else if (this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_SELECTING_LEVELS ||
                 this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_NEXT_LEVEL_CONFIRMATION)
        {
            this.m_levelSelector.implementGameLogic();
        }
    };

    PlayFlow.prototype.render = function () 
    {
        this.m_desktop.render();
        this.m_levelSelector.render();
    };

    PlayFlow.prototype.setState = function (_state) 
    {
        this.m_state = _state;
    };

    PlayFlow.prototype.onNotify = function (_sender, _event) 
    {
        if (_event === PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_CLIC)
        {
            this.m_desktop.setEnabled(false);
            this.m_levelSelector.show();    
            this.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_SELECTING_LEVELS);
        }
        else if (_event === PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK)
        {
            this.m_desktop.setEnabled(true);
            this.m_desktop.showLevelSelectorIcon();    
            this.setEnabledtState(PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING);
        }
        else if (_event === PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_PREVIOUS_LEVEL)
        {
            this.m_desktop.previousLevel();    
        }
        else if (_event === PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_NEXT_LEVEL)
        {
            this.m_desktop.nextLevel();    
        }
        else if (_event === PlayFlow.C_EVENT_ON_FINISH_LEVEL)
        {
            this.m_desktop.setEnabled(false);
            this.m_levelSelector.setLevelFinished();
            this.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_NEXT_LEVEL_CONFIRMATION);
        }
    };
};



