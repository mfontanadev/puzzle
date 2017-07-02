function LevelSelector() 
{
    this.m_viewParent = null;

    this.m_visible = false;

    this.m_backgroundBitmap = null;
    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    this.m_btnPreviousLevel = null;
    this.m_btnNextLevel = null;
    this.m_btnBack = null;
    
    this.m_parentDesktop = null;

    LevelSelector.prototype.init = function (_viewParent, _x1, _y1, _width, _height, _parentDesktop) 
    {
        this.m_viewParent = _viewParent;

        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;

        this.m_backgroundBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName("toolbar_background.png");

        this.m_parentDesktop = _parentDesktop;

        this.m_btnPreviousLevel = new CanvasControl();
        this.m_btnPreviousLevel.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 - 60, this.m_y1, 30, 30, "");
        this.m_btnPreviousLevel.setImage("left_up.png") ;
        this.m_btnPreviousLevel.setImageDown("left_down.png");
        this.m_btnPreviousLevel.registerOnClick(this, this.btnPreviousLevel_click_controller);
        this.m_btnPreviousLevel.setEnabled(true);
        this.m_btnPreviousLevel.setVisible(true);

        this.m_btnNextLevel = new CanvasControl();
        this.m_btnNextLevel.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 + 60, this.m_y1, 30, 30, "");
        this.m_btnNextLevel.setImage("right_up.png") ;
        this.m_btnNextLevel.setImageDown("right_down.png");
        this.m_btnNextLevel.registerOnClick(this, this.btnNextLevel_click_controller);
        this.m_btnNextLevel.setEnabled(true);
        this.m_btnNextLevel.setVisible(true);

        this.m_btnBack = new CanvasControl();
        this.m_btnBack.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1, this.m_y1, 30, 30, "");
        this.m_btnBack.setImage("toolbar_close_up.png") ;
        this.m_btnBack.setImageDown("toolbar_close_down.png");
        this.m_btnBack.registerOnClick(this, this.btnBack_click_controller);
        this.m_btnBack.setEnabled(true);
        this.m_btnBack.setVisible(true);
    };

    // ****************************************
    // Main cicle: handleInputs, implementGameLogic, render
    // ****************************************
    LevelSelector.prototype.handleInputs = function () 
    {
    };

    LevelSelector.prototype.implementGameLogic = function () 
    {
    };

    LevelSelector.prototype.render = function () 
    {
        if (this.m_visible === true)
        {
            drawImageRotationTransparentScaled( 
                            this.m_viewParent.m_canvasEx.m_canvas, 
                            this.m_viewParent.m_canvasEx.m_context, 
                            this.m_backgroundBitmap, 
                            this.m_x1, this.m_y1,
                            0,1,1);
        
            this.m_btnPreviousLevel.render();
            this.m_btnNextLevel.render();
            this.m_btnBack.render();
        }
    };

    // ****************************************
    // Auxiliars
    // ****************************************
    LevelSelector.prototype.show = function () 
    {
        this.m_visible = true;

        this.m_btnPreviousLevel.setEnabled(true);
        this.m_btnPreviousLevel.setVisible(true);

        this.m_btnNextLevel.setEnabled(true);
        this.m_btnNextLevel.setVisible(true);

        this.m_btnBack.setEnabled(true);
        this.m_btnBack.setVisible(true);

    }; 

    LevelSelector.prototype.hide = function () 
    {
        this.m_visible = false;

        this.m_btnPreviousLevel.setEnabled(false);
        this.m_btnPreviousLevel.setVisible(false);

        this.m_btnNextLevel.setEnabled(false);
        this.m_btnNextLevel.setVisible(false);

        this.m_btnBack.setEnabled(false);
        this.m_btnBack.setVisible(false);
    }; 


    LevelSelector.prototype.btnPreviousLevel_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().m_parentDesktop.previousLevel();
    }; 

    LevelSelector.prototype.btnNextLevel_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().m_parentDesktop.nextLevel();
    }; 

    LevelSelector.prototype.btnBack_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().hide();
    }; 

};

