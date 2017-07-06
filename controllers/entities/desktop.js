Desktop.C_PLAY_PANEL_WIDTH = 460;
Desktop.C_PIECES_PANEL_WIDTH = 150;

function Desktop() 
{
    this.m_viewParent = null;
    this.m_levelFactory = null;

    this.m_desktopBitmap = null;
    this.m_pieces = new Array();
    this.m_currentLevelIndex = 0;
    this.m_btnLevelSelector = null;

    this.m_playPanel = null; 
    this.m_piecesPanel = null; 

    this.m_observer = null;

    Desktop.prototype.init = function (_viewParent) 
    {
        this.m_viewParent = _viewParent;

        this.m_playPanel = new PlayPanel();
        this.m_playPanel.init(this.m_viewParent, 
                                    10, 10, 
                                    Desktop.C_PLAY_PANEL_WIDTH, Desktop.C_PLAY_PANEL_WIDTH);

        this.m_piecesPanel = new PiecesPanel();
        this.m_piecesPanel.init(this.m_viewParent, 
                                    Desktop.C_PLAY_PANEL_WIDTH + 20, 10, 
                                    Desktop.C_PIECES_PANEL_WIDTH, Desktop.C_PLAY_PANEL_WIDTH);

        this.m_levelFactory = new LevelFactory();
        this.m_levelFactory.init(this.m_viewParent, this.m_pieces);
        this.m_currentLevelIndex = 0;
        this.loadLevel(this.m_currentLevelIndex);

        this.m_desktopBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName('desktop_theme1.png');

        // Open/Close level selector button.   
        var toolbarCenterX = Desktop.C_PLAY_PANEL_WIDTH / 2;
        var toolbarCenterY = Desktop.C_PLAY_PANEL_WIDTH;
        this.m_btnLevelSelector = new CanvasControl();
        this.m_btnLevelSelector.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                toolbarCenterX - 7 + 15, toolbarCenterY - 15, 30, 30, "");
        this.m_btnLevelSelector.setImage("toolbar_open_up.png");
        this.m_btnLevelSelector.setImageDown("toolbar_open_down.png");
        this.m_btnLevelSelector.registerOnClick(this, this.btnLevelSelector_click_controller);
        this.m_btnLevelSelector.setEnabled(true);
        this.m_btnLevelSelector.setVisible(true);
    };

    // ****************************************
    // Main cicle: handleInputs, implementGameLogic, render
    // ****************************************
    Desktop.prototype.handleInputs = function () 
    {
        this.m_playPanel.handleInputs();
        this.m_piecesPanel.handleInputs();
    };

    Desktop.prototype.implementGameLogic = function () 
    {
        this.processMouseOverPieces();
        this.m_playPanel.implementGameLogic();
        this.m_piecesPanel.implementGameLogic();

        if (this.isLevelFinished() === true)
        {
            this.m_viewParent.getSoundManagerInstance().playSoundByName("level_finished.wav");
            this.hideLevelSelectorIcon();
            this.notify(PlayFlow.C_EVENT_ON_FINISH_LEVEL);
        }
    };

    Desktop.prototype.render = function () 
    {
        this.m_playPanel.render();

        this.m_piecesPanel.render();

        this.renderPieces() 

        drawImageTransparent( 
            this.m_viewParent.m_canvasEx.m_canvas, 
            this.m_viewParent.m_canvasEx.m_context, 
            this.m_desktopBitmap, 
            0, 0, 1);

        this.m_btnLevelSelector.render();

        this.renderSelectedPiece() 
    };

    Desktop.prototype.renderPieces = function () 
    {
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            this.m_pieces[i].render(this.m_viewParent.m_canvasEx, this.m_viewParent.m_canvasEx.m_context);
        }
    };

    Desktop.prototype.renderSelectedPiece = function () 
    {
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            if (this.m_pieces[i].isMouseOver() === true)
            {
                this.m_pieces[i].render(this.m_viewParent.m_canvasEx, this.m_viewParent.m_canvasEx.m_context);
            }
        }
    };

    // ****************************************
    // Auxiliar functions
    // ****************************************
    Desktop.prototype.nextLevel = function () 
    {
        this.m_currentLevelIndex++;
        if (this.m_currentLevelIndex >= this.getLevelsCount())
        {
            this.m_currentLevelIndex = 0;
        }
        this.loadLevel(this.m_currentLevelIndex);
    };

    Desktop.prototype.previousLevel = function () 
    {
        this.m_currentLevelIndex--;
        if (this.m_currentLevelIndex < 0)
        {
            this.m_currentLevelIndex = this.getLevelsCount() - 1;
        }
        this.loadLevel(this.m_currentLevelIndex);
    };
    
    Desktop.prototype.loadLevel = function (_levelNumber) 
    {
        this.m_levelFactory.loadLevel(_levelNumber, this.m_playPanel, this.m_piecesPanel, this.m_pieces);  
    }

    Desktop.prototype.getLevelsCount = function () 
    {
        return LevelFactory.C_LEVELS_COUNT;
    };

    Desktop.prototype.processMouseOverPieces = function () 
    {
        var pieces = this.m_piecesPanel.getPiecesCollection();
        var mouse = this.m_viewParent.getMouseManagerInstance();

        var index = 0;
        var mouseOverPIeceIndex = -1;

        // Get first piece that mouse is over.
        for (index = 0; index < pieces.length; index++) 
        {
            if (pieces[index].isMouseOver() === true)
            {
                mouseOverPIeceIndex = index;
                break;
            }
        }

        for (index = 0; index < pieces.length; index++) 
        {
            if (pieces[index].isPieceAllocated() === false && 
                (mouseOverPIeceIndex === -1) ||  (mouseOverPIeceIndex !== -1 && index === mouseOverPIeceIndex))
            {
                if (mouse.m_mouseClick === true)
                {
                    pieces[index].clicDown(mouse.m_mousePosX, mouse.m_mousePosY);
                }
                else
                {
                    pieces[index].clicUp(mouse.m_mousePosX, mouse.m_mousePosY);   
                }                
            }
        }
    };

    Desktop.prototype.btnLevelSelector_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().hideLevelSelectorIcon();
        _sender.getOnClickParent().notify(PlayFlow.C_EVENT_ON_LEVEL_SELECTOR_CLIC);
    }

    Desktop.prototype.showLevelSelectorIcon = function () 
    {
        this.m_btnLevelSelector.setEnabled(true);
        this.m_btnLevelSelector.setVisible(true);
    }; 

    Desktop.prototype.hideLevelSelectorIcon = function () 
    {
        this.m_btnLevelSelector.setEnabled(false);
        this.m_btnLevelSelector.setVisible(false);
    }; 

    Desktop.prototype.isLevelFinished = function () 
    {
        var pieces = this.m_piecesPanel.getPiecesCollection();
        var allPiecesAllocated = true; 

        // Get first piece non allocated.
        for (index = 0; index < pieces.length; index++) 
        {
            if (pieces[index].isPieceAllocated() === false)
            {
                allPiecesAllocated = false;
                break;
            }
        }
        
        return allPiecesAllocated;
    };

    Desktop.prototype.registerObserver = function (_observer) 
    {
        this.m_observer = _observer;
    }    

    Desktop.prototype.notify = function (_event) 
    {
        if (this.m_observer !== null)
        {
            this.m_observer.onNotify(this, _event);
        }
    }
};



