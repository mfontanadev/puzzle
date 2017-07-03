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
    this.m_confirmationMode = false;

    LevelSelector.prototype.init = function (_viewParent, _x1, _y1, _width, _height) 
    {
        this.m_viewParent = _viewParent;

        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;

        this.m_backgroundBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName("toolbar_background.png");

        var middleW = _width / 2;
        this.m_btnPreviousLevel = new CanvasControl();
        this.m_btnPreviousLevel.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 -middleW + 20, this.m_y1 - 20, 30, 30, "");
        this.m_btnPreviousLevel.setImage("left_up.png") ;
        this.m_btnPreviousLevel.setImageDown("left_down.png");
        this.m_btnPreviousLevel.registerOnClick(this, this.btnPreviousLevel_click_controller);
        this.m_btnPreviousLevel.setEnabled(false);
        this.m_btnPreviousLevel.setVisible(false);

        this.m_btnNextLevel = new CanvasControl();
        this.m_btnNextLevel.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 + middleW - 30 - 20, this.m_y1 - 20, 30, 30, "");
        this.m_btnNextLevel.setImage("right_up.png") ;
        this.m_btnNextLevel.setImageDown("right_down.png");
        this.m_btnNextLevel.registerOnClick(this, this.btnNextLevel_click_controller);
        this.m_btnNextLevel.setEnabled(false);
        this.m_btnNextLevel.setVisible(false);

        this.m_btnBack = new CanvasControl();
        this.m_btnBack.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 - 15, this.m_y1 - 8, 30, 30, "");
        this.m_btnBack.setImage("toolbar_close_up.png") ;
        this.m_btnBack.setImageDown("toolbar_close_down.png");
        this.m_btnBack.registerOnClick(this, this.btnBack_click_controller);
        this.m_btnBack.setEnabled(false);
        this.m_btnBack.setVisible(false);
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

        this.m_parentDesktop.hideLevelSelectorIcon();
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

        this.m_parentDesktop.showLevelSelectorIcon();        
    }; 

    LevelSelector.prototype.back = function () 
    {
        if (this.m_confirmationMode === false)
        {
            this.hide();
        }
        else
        {
            this.m_confirmationMode = false;
            this.m_parentDesktop.nextLevel();
            this.hide();
        }
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
        _sender.getOnClickParent().back();
    }; 

    LevelSelector.prototype.isVisible = function () 
    {
        return this.m_visible === true;
    }; 

    LevelSelector.prototype.registerDesktop = function (_desktop) 
    {
        return this.m_parentDesktop = _desktop;
    };

    LevelSelector.prototype.registerDesktop = function (_desktop) 
    {
        return this.m_parentDesktop = _desktop;
    };

    LevelSelector.prototype.setConfirmationMode = function () 
    {
        this.m_confirmationMode = true;

        this.m_visible = true;

        this.m_btnPreviousLevel.setEnabled(false);
        this.m_btnPreviousLevel.setVisible(false);

        this.m_btnNextLevel.setEnabled(false);
        this.m_btnNextLevel.setVisible(false);

        this.m_btnBack.setEnabled(true);
        this.m_btnBack.setVisible(true);

        this.m_parentDesktop.hideLevelSelectorIcon();
    };
    
};

