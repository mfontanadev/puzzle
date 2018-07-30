LevelSelectorPanel.C_LEVEL_FINISHED_DELAY_SECONDS = 3;       

LevelSelectorPanel.C_COLS = 3;
LevelSelectorPanel.C_ROWS = 2;

LevelSelectorPanel.C_PADDING_H = 40;
LevelSelectorPanel.C_PADDING_V = 40;
LevelSelectorPanel.C_THUMBAIL_W = 42 * 3;
LevelSelectorPanel.C_THUMBAIL_H = 42 * 3;

function LevelSelectorPanel() 
{
    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    this.m_btnPreviousLevel = null;
    this.m_btnNextLevel = null;
    this.m_btnBack = null;
    
    this.m_observer = null;

    this.m_pageIndex = 0;
    this.m_levelThumbails = new Array();
    this.m_levelIndexClicked = -1;

    LevelSelectorPanel.prototype.init = function (_x1, _y1, _width, _height) 
    {
        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;
        
        this.m_btnPreviousLevel = new CanvasControl();
        this.m_btnPreviousLevel.initButtonStyle(viewMngr.getCanvasEx(), 
                                30, 
                                viewMngr.getHeight() / 2 - 15 - 20, 
                                30, 30, "");
        this.m_btnPreviousLevel.setImage("left_up.png") ;
        this.m_btnPreviousLevel.setImageDown("left_down.png");
        this.m_btnPreviousLevel.registerOnClick(this, this.btnPreviousLevel_click_controller);

        this.m_btnNextLevel = new CanvasControl();
        this.m_btnNextLevel.initButtonStyle(viewMngr.getCanvasEx(), 
                                viewMngr.getWidth() - 30 - 30, 
                                viewMngr.getHeight() / 2 - 15 - 20, 
                                30, 30, "");
        this.m_btnNextLevel.setImage("right_up.png") ;
        this.m_btnNextLevel.setImageDown("right_down.png");
        this.m_btnNextLevel.registerOnClick(this, this.btnNextLevel_click_controller);

        this.m_btnBack = new CanvasControl();
        this.m_btnBack.initButtonStyle(viewMngr.getCanvasEx(), 
                                viewMngr.getWidth() / 2 - 15, 
                                viewMngr.getHeight() - 60, 
                                30, 30, "");
        this.m_btnBack.setImage("back_up.png") ;
        this.m_btnBack.setImageDown("back_down.png");
        this.m_btnBack.registerOnClick(this, this.btnBack_click_controller);

        // hardcoded for testing.
        this.getThumbailsFromServer();

        this.updateThumbailsGrid();           
        this.hide();
    };

    // ****************************************
    // Main cicle: handleInputs, implementGameLogic, render
    // ****************************************
    LevelSelectorPanel.prototype.handleInputs = function () 
    {
    };

    LevelSelectorPanel.prototype.implementGameLogic = function () 
    {
        var indexClicked = this.getThumbailIndexClicked();

        if (indexClicked !== -1)
        {
            this.m_levelIndexClicked = indexClicked; 
            this.notify(LevelsFlow.C_EVENT_ON_LEVEL_SELECTOR_SELECTED);
        }
    };

    LevelSelectorPanel.prototype.render = function () 
    {
        this.m_btnPreviousLevel.render();
        this.m_btnNextLevel.render();
        this.m_btnBack.render();        

        for (var i = 0; i < this.m_levelThumbails.length; i++)
            this.m_levelThumbails[i].render();
    };

    // ****************************************
    // Auxiliars
    // ****************************************
    LevelSelectorPanel.prototype.getThumbailsFromServer = function () 
    {
        var levelThumbail = new LevelThumbail();
        levelThumbail.init(0, "puzzle_peppa_background.png");
        levelThumbail.m_levelBlocked = false; 
        this.m_levelThumbails.push(levelThumbail);

        levelThumbail = new LevelThumbail();
        levelThumbail.init(1, "puzzle_peppa2_background.png");
        this.m_levelThumbails.push(levelThumbail);

        levelThumbail = new LevelThumbail();
        levelThumbail.init(2, "puzzle_peppa3_background.png");
        this.m_levelThumbails.push(levelThumbail);

        levelThumbail = new LevelThumbail();
        levelThumbail.init(4, "puzzle_peppa4_background.png");
        this.m_levelThumbails.push(levelThumbail);
    }

    LevelSelectorPanel.prototype.setCurrentLevelSolved = function () 
    {
        this.m_levelThumbails[this.getLevelIndexClicked()].m_levelSolved = true;
    }

    LevelSelectorPanel.prototype.getThumbailIndexClicked = function () 
    {
        var mouse = viewMngr.getMouseManagerInstance();
        var levelSelectedIndex = -1;

        for (var i = 0; i < this.m_levelThumbails.length; i++)
        {
            if (mouse.m_mouseClick === true)
            {
                this.m_levelThumbails[i].clicDown(mouse.m_mousePosX, mouse.m_mousePosY);
            }
            else
            {
                if (this.m_levelThumbails[i].clicUp(mouse.m_mousePosX, mouse.m_mousePosY) === true)
                {
                    levelSelectedIndex = i;
                }
            }
        }

        return levelSelectedIndex;
    }

    LevelSelectorPanel.prototype.updateThumbailsGrid = function () 
    {
        var rect = null;
        var levelThumbail = null;

        var colWidth = LevelSelectorPanel.C_THUMBAIL_W + LevelSelectorPanel.C_PADDING_H;
        var rowHeight = LevelSelectorPanel.C_THUMBAIL_H + LevelSelectorPanel.C_PADDING_V;
        var offsetX = getCenter(this.m_width, (colWidth * LevelSelectorPanel.C_COLS) - LevelSelectorPanel.C_PADDING_H);
        var offsetY = getCenter(this.m_height, (rowHeight * LevelSelectorPanel.C_ROWS) - LevelSelectorPanel.C_PADDING_V) - 20;

        var imageIndex = 0;
        var imageIndexAbsolute = this.getImageIndexAbsolute(this.m_pageIndex, imageIndex);

        for (var y = 0; y < LevelSelectorPanel.C_ROWS; y++) 
        {
            for (var x = 0; x < LevelSelectorPanel.C_COLS; x++)
            {
                if (imageIndexAbsolute > -1)
                {
                    rect = new ChRect();
                    rect.initWith(
                        this.m_x1 + offsetX + (x * colWidth),             
                        this.m_y1 + offsetY + (y * rowHeight), 
                        this.m_x1 + offsetX + ((x + 1) * colWidth) - LevelSelectorPanel.C_PADDING_H,  
                        this.m_y1 + offsetY + ((y + 1) * rowHeight) - LevelSelectorPanel.C_PADDING_V);
                
                    levelThumbail = this.m_levelThumbails[imageIndexAbsolute];
                    levelThumbail.setCollitionRectangle(rect);

                    /*
                    if (imageIndex < 2)
                        levelThumbail.m_levelSolved = true;
                    
                    if (imageIndex > 2)
                        levelThumbail.m_levelBlocked = true;
                    */

                    imageIndex++;
                    imageIndexAbsolute = this.getImageIndexAbsolute(this.m_pageIndex, imageIndex);
                }
            } 
        }

        this.showHideScrollButtons();
    };

    LevelSelectorPanel.prototype.showHideScrollButtons = function () 
    {
        var showPrevButton = (this.m_pageIndex > 0);
        this.m_btnPreviousLevel.setEnabled(showPrevButton);
        this.m_btnPreviousLevel.setVisible(showPrevButton);

        var showNextButton = (this.getImageIndexAbsolute(this.m_pageIndex + 1, 0) !== -1);
        this.m_btnNextLevel.setEnabled(showNextButton);
        this.m_btnNextLevel.setVisible(showNextButton);
    }

    LevelSelectorPanel.prototype.getImageIndexAbsolute = function (_pageIndex, _imageIndex) 
    {
        var result = -1; 

        if (this.m_levelThumbails.length > 0)
            result = (_pageIndex * (LevelSelectorPanel.C_COLS * LevelSelectorPanel.C_ROWS)) + _imageIndex;
        
        if (result >= this.m_levelThumbails.length)
            result = -1;

        return result;
    }
        
    LevelSelectorPanel.prototype.show = function () 
    {
        this.showHideScrollButtons();

        this.m_btnBack.setEnabled(true);
        this.m_btnBack.setVisible(true);
    }; 

    LevelSelectorPanel.prototype.hide = function () 
    {
        this.m_btnPreviousLevel.setEnabled(false);
        this.m_btnPreviousLevel.setVisible(false);

        this.m_btnNextLevel.setEnabled(false);
        this.m_btnNextLevel.setVisible(false);

        this.m_btnBack.setEnabled(false);
        this.m_btnBack.setVisible(false);
    }; 

    LevelSelectorPanel.prototype.btnPreviousLevel_click_controller = function (_event, _sender) 
    {
        owner = _sender.getOnClickParent();
        if (owner.m_pageIndex > 0)
        {
            owner.m_pageIndex--;
            owner.updateThumbailsGrid();
        }
    }; 

    LevelSelectorPanel.prototype.btnNextLevel_click_controller = function (_event, _sender) 
    {
        owner = _sender.getOnClickParent();
        if (owner.getImageIndexAbsolute(owner.m_pageIndex + 1, 0) > -1)
        {
            owner.m_pageIndex++;
            owner.updateThumbailsGrid();
        }
    }; 

    LevelSelectorPanel.prototype.btnBack_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().notify(LevelsFlow.C_EVENT_ON_LEVEL_SELECTOR_BACK);
    }; 

    LevelSelectorPanel.prototype.registerObserver = function (_observer) 
    {
        this.m_observer = _observer;
    }    

    LevelSelectorPanel.prototype.notify = function (_event) 
    {
        if (this.m_observer !== null)
            this.m_observer.onNotify(this, _event);
    }

    LevelSelectorPanel.prototype.getLevelIndexClicked = function () 
    {
        return this.m_levelIndexClicked;
    }
};

