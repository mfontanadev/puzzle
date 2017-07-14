LevelSelector.C_LEVEL_SELECTOR_WIDTH = 180;
LevelSelector.C_LEVEL_SELECTOR_HEIGHT = 60;
LevelSelector.C_LEVEL_FINISHED_DELAY_SECONDS = 3;       

function LevelSelector() 
{
    this.m_viewParent = null;

    this.m_visible = false;

    this.m_backgroundBitmap = null;
    this.m_levelFinishedBitmap = null;
    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    this.m_btnPreviousLevel = null;
    this.m_btnNextLevel = null;
    this.m_btnBack = null;
    
    this.m_observer = null;
    this.m_confirmationMode = false;
    this.m_levelFinished = false;
    this.m_levelFinishedStartTimer = 0;

    LevelSelector.prototype.init = function (_viewParent, _parentSize) 
    {
        this.m_viewParent = _viewParent;

        this.m_x1 = (_parentSize / 2) + 15;
        this.m_y1 = _parentSize / 2;
        this.m_width = LevelSelector.C_LEVEL_SELECTOR_WIDTH;;
        this.m_height = LevelSelector.C_LEVEL_SELECTOR_HEIGHT;

        this.m_backgroundBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName("toolbar_background.png");
        this.m_levelFinishedBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName("level_finished.png");

        var middleW = (this.m_width / 2);
        this.m_btnPreviousLevel = new CanvasControl();
        this.m_btnPreviousLevel.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 -middleW + 20, this.m_y1 - getCenter(this.m_height, 30), 30, 30, "");
        this.m_btnPreviousLevel.setImage("left_up.png") ;
        this.m_btnPreviousLevel.setImageDown("left_down.png");
        this.m_btnPreviousLevel.registerOnClick(this, this.btnPreviousLevel_click_controller);
        this.m_btnPreviousLevel.setEnabled(false);
        this.m_btnPreviousLevel.setVisible(false);

        this.m_btnNextLevel = new CanvasControl();
        this.m_btnNextLevel.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 + middleW - 30 - 20, this.m_y1 - getCenter(this.m_height, 30), 30, 30, "");
        this.m_btnNextLevel.setImage("right_up.png") ;
        this.m_btnNextLevel.setImageDown("right_down.png");
        this.m_btnNextLevel.registerOnClick(this, this.btnNextLevel_click_controller);
        this.m_btnNextLevel.setEnabled(false);
        this.m_btnNextLevel.setVisible(false);

        this.m_btnBack = new CanvasControl();
        this.m_btnBack.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                this.m_x1 - 15, this.m_y1 - getCenter(this.m_height, 30), 30, 30, "");
        this.m_btnBack.setImage("ok_up.png") ;
        this.m_btnBack.setImageDown("ok_down.png");
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
        if (this.m_levelFinished === true)
        {
            console.log("ff");
            if (Date.now() - this.m_levelFinishedStartTimer > (LevelSelector.C_LEVEL_FINISHED_DELAY_SECONDS * 1000))
            {
                this.back();
            }
        }
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
        
            if (this.m_levelFinished === true)
            {
                drawImageRotationTransparentScaled( 
                                this.m_viewParent.m_canvasEx.m_canvas, 
                                this.m_viewParent.m_canvasEx.m_context, 
                                this.m_levelFinishedBitmap, 
                                this.m_x1, this.m_y1,
                                0,1,1);                
            }

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

    LevelSelector.prototype.back = function () 
    {
        if (this.m_confirmationMode === false && this.m_levelFinished === false)
        {
            this.hide();
            this.notify(PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK);
        }
        else if (this.m_confirmationMode === true || this.m_levelFinished === true)
        {
            this.m_confirmationMode = false;
            this.m_levelFinished = false;
            this.hide();
            this.notify(PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_NEXT_LEVEL);
            this.notify(PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK);
        }
    }; 

    LevelSelector.prototype.btnPreviousLevel_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().notify(PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_PREVIOUS_LEVEL);
    }; 

    LevelSelector.prototype.btnNextLevel_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().notify(PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_NEXT_LEVEL);
    }; 

    LevelSelector.prototype.btnBack_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().back();
    }; 

    LevelSelector.prototype.isVisible = function () 
    {
        return this.m_visible === true;
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


    };

    LevelSelector.prototype.setLevelFinished = function () 
    {
        this.m_levelFinished = true;

        this.m_visible = true;

        this.m_btnPreviousLevel.setEnabled(false);
        this.m_btnPreviousLevel.setVisible(false);

        this.m_btnNextLevel.setEnabled(false);
        this.m_btnNextLevel.setVisible(false);

        this.m_btnBack.setEnabled(false);
        this.m_btnBack.setVisible(false);

        this.m_levelFinishedStartTimer = Date.now();
    };

    LevelSelector.prototype.registerObserver = function (_observer) 
    {
        this.m_observer = _observer;
    }    

    LevelSelector.prototype.notify = function (_event) 
    {
        if (this.m_observer !== null)
        {
            this.m_observer.onNotify(this, _event);
        }
    }

};

