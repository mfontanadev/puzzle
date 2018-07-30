MainFlow.C_MAIN_FLOW_APPSTATE_MAIN = 0;

MainFlow.C_EVENT_ON_PLAY_BUTTON_CLIC = 101;

function MainFlow() 
{
    this.m_state = null;
    this.m_btnPLay = null;

    MainFlow.prototype.init = function () 
    {
        // Open/Close level selector button.   
        this.m_btnPLay = new CanvasControl();
        this.m_btnPLay.initButtonStyle(viewMngr.getCanvasEx(), 
                                viewMngr.getWidth() / 2 - 100, 
                                viewMngr.getHeight() / 2 - 50, 200, 50, "");
        this.m_btnPLay.setImage("play_up.png");
        this.m_btnPLay.setImageDown("play_down.png");
        this.m_btnPLay.registerOnClick(this, this.btnPlay_click_controller);
        this.m_btnPLay.setTheme(CanvasControl.C_THEME_TYPE_BORDERLESS);

        this.m_state = MainFlow.C_MAIN_FLOW_APPSTATE_MAIN;
    };

    MainFlow.prototype.onEnterFlow = function ()
    {
        this.m_btnPLay.setEnabled(true);
        this.m_btnPLay.setVisible(true);
    };

    MainFlow.prototype.handleInputs = function ()
    {

    };

    MainFlow.prototype.implementGameLogic = function () 
    {
        if (this.m_state === MainFlow.C_MAIN_FLOW_APPSTATE_MAIN)
        {
        }
    };

    MainFlow.prototype.render = function () 
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

        this.m_btnPLay.render();
    };

    MainFlow.prototype.onLeaveFlow = function ()
    {
        this.m_btnPLay.setEnabled(false);
        this.m_btnPLay.setVisible(false);
    };
    
    MainFlow.prototype.setState = function (_state) 
    {
        this.m_state = _state;
    };

    MainFlow.prototype.btnPlay_click_controller = function (_event, _sender) 
    {
        viewMngr.navigateTo(PuzzleContext.C_ACTIVITY_LEVELS);
    }    
};



