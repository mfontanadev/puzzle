PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL = 0;
PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING = 1;
PlayFlow.C_PLAY_FLOW_APPSTATE_SELECTING_LEVELS = 2;
PlayFlow.C_PLAY_FLOW_APPSTATE_END_LEVEL_CONFIRMATION = 3;

PlayFlow.C_EVENT_ON_BUTTON_BACK = 102;

function PlayFlow() 
{
    this.m_desktop = null;

    this.m_state = null;
    this.m_levelFinishedStartTimer = 0;

    PlayFlow.prototype.init = function () 
    {
        this.m_desktop = viewMngr.getDataContext().m_desktop;
        this.m_desktop.registerObserver(this);

        this.m_state = PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL;
    };

    PlayFlow.prototype.handleInputs = function ()
    {
        if (this.m_state > PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL)
            this.m_desktop.handleInputs();
    };

    PlayFlow.prototype.implementGameLogic = function () 
    {
        if (this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL)
        {
            this.m_desktop.reset();
            this.m_desktop.loadLevel(viewMngr.getDataContext().m_levelSelector.getLevelIndexClicked());
            this.m_desktop.showControls();
            this.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING);
        }
        else if (this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_PLAYING)
        {
            this.m_desktop.implementGameLogic();
        }
        else if (this.m_state === PlayFlow.C_PLAY_FLOW_APPSTATE_END_LEVEL_CONFIRMATION)
        {
            if (Date.now() - this.m_levelFinishedStartTimer > (Desktop.C_LEVEL_FINISHED_DELAY_SECONDS * 1000))
            {
                this.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL);
                this.btnBack();
            }
        }
    };

    PlayFlow.prototype.render = function () 
    {
        if (this.m_state > PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL)
            this.m_desktop.render();
    };

    PlayFlow.prototype.setState = function (_state) 
    {
        this.m_state = _state;
    };

    PlayFlow.prototype.btnBack = function () 
    {
        viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_LEVELS);
    }

    PlayFlow.prototype.onNotify = function (_sender, _event) 
    {
        if (_event === PlayFlow.C_EVENT_ON_BUTTON_BACK)
        {
            this.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_LOADINGLEVEL);
            this.btnBack();
        }
        else if (_event === PlayFlow.C_EVENT_ON_FINISH_LEVEL)
        {
            viewMngr.getSoundManagerInstance().playSoundByName("level_finished.wav");
            viewMngr.getDataContext().m_levelSelector.setCurrentLevelSolved();
            this.m_levelFinishedStartTimer = Date.now();
            this.setState(PlayFlow.C_PLAY_FLOW_APPSTATE_END_LEVEL_CONFIRMATION);
        }
    };
};



