LevelsFlow.C_EVENT_ON_PLAY_BUTTON_CLIC = 101;
LevelsFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK = 102;
LevelsFlow.C_EVENT_ON_LEVEL_SELECTOR_SELECTED = 103;

function LevelsFlow() 
{
    this.m_levelSelector = null;

    LevelsFlow.prototype.init = function () 
    {
        this.m_levelSelector = viewMngr.getDataContext().m_levelSelector;
        this.m_levelSelector.registerObserver(this);
    };

    LevelsFlow.prototype.onEnterFlow = function ()
    {
        this.m_levelSelector.show();
    };

    LevelsFlow.prototype.handleInputs = function ()
    {
        
    };

    LevelsFlow.prototype.implementGameLogic = function () 
    {
        this.m_levelSelector.implementGameLogic();
    };

    LevelsFlow.prototype.render = function () 
    {
        drawImageTransparent( 
            viewMngr.getCanvasEx().m_canvas, 
            viewMngr.getCanvasEx().m_context, 
            viewMngr.getBitmapManagerInstance().getImageByName('main_background.png'), 
            0, 0, 1);

        drawImageTransparent( 
            viewMngr.getCanvasEx().m_canvas, 
            viewMngr.getCanvasEx().m_context, 
            viewMngr.getBitmapManagerInstance().getImageByName('main_screen.png'), 
            0, 0, 1);

        this.m_levelSelector.render();        
    };

    LevelsFlow.prototype.onLeaveFlow = function ()
    {
        this.m_levelSelector.hide();
    };
    
    LevelsFlow.prototype.setState = function (_state) 
    {
    };

    LevelsFlow.prototype.onNotify = function (_sender, _event) 
    {
        if (_event === LevelsFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK)
        {
             viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_MAIN);
        }
        else if (_event === LevelsFlow.C_EVENT_ON_LEVEL_SELECTOR_SELECTED)
        {
            viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_PLAY);
        }
    };    
};



