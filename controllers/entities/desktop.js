Desktop.C_PLAY_PANEL_WIDTH = 460;
Desktop.C_PIECES_PANEL_WIDTH = 150;

Desktop.C_LEVEL_FINISHED_DELAY_SECONDS = 3; 

function Desktop() 
{
    this.m_level = null;

    this.m_desktopBitmap = null;
    this.m_backgroundBitmap = null;
    this.m_levelFinishedBitmap = null;

    this.m_pieces = new Array();
    this.m_currentLevelIndex = -1;
    this.m_btnBack = null;

    this.m_playPanel = null; 
    this.m_piecesPanel = null; 

    this.m_observer = null;
    this.m_levelFinishedStartTimer = 0;

    this.m_levelFinished = false;

    Desktop.prototype.init = function () 
    {
        this.m_playPanel = new PlayPanel();
        this.m_playPanel.init(10, 10, Desktop.C_PLAY_PANEL_WIDTH, Desktop.C_PLAY_PANEL_WIDTH);

        this.m_piecesPanel = new PiecesPanel();
        this.m_piecesPanel.init(Desktop.C_PLAY_PANEL_WIDTH + 18, 10, 
                                Desktop.C_PIECES_PANEL_WIDTH, Desktop.C_PLAY_PANEL_WIDTH);

        this.m_level = new Level();
        this.m_level.init(this.m_pieces);

        this.m_desktopBitmap = viewMngr.getBitmapManagerInstance().getImageByName('desktop_screen.png');
        this.m_backgroundBitmap = viewMngr.getBitmapManagerInstance().getImageByName("toolbar_background.png");
        this.m_levelFinishedBitmap = viewMngr.getBitmapManagerInstance().getImageByName("level_finished_eng.png");
        
        // Open/Close level selector button.   
        var toolbarCenterX = Desktop.C_PLAY_PANEL_WIDTH + ((viewMngr.getCanvasEx().m_canvas.width - Desktop.C_PLAY_PANEL_WIDTH) / 2);
        var toolbarCenterY = Desktop.C_PLAY_PANEL_WIDTH - 10;
        this.m_btnBack = new CanvasControl();
        this.m_btnBack.initButtonStyle(viewMngr.getCanvasEx(), toolbarCenterX - 15, toolbarCenterY - 15, 30, 30, "");
        this.m_btnBack.setImage("home_up.png");
        this.m_btnBack.setImageDown("home_down.png");
        this.m_btnBack.registerOnClick(this, this.btnBack_click_controller);
        this.m_btnBack.setEnabled(false);
        this.m_btnBack.setVisible(false);
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
            this.hideControls();
            this.notify(PlayFlow.C_EVENT_ON_FINISH_LEVEL);
        }
    };

    Desktop.prototype.render = function () 
    {
        this.m_playPanel.render();

        this.m_piecesPanel.render();

        this.renderPieces() 

        drawImageTransparent( 
            viewMngr.getCanvasEx().m_canvas, 
            viewMngr.getCanvasEx().m_context, 
            this.m_desktopBitmap, 
            0, 0, 1);

        this.m_btnBack.render();

        this.renderSelectedPiece() 

        if (this.isLevelFinished() === true)
        {
            drawImageRotationTransparentScaled( 
                        viewMngr.getCanvasEx().m_canvas, 
                        viewMngr.getCanvasEx().m_context, 
                        this.m_backgroundBitmap, 
                        Desktop.C_PLAY_PANEL_WIDTH / 2, Desktop.C_PLAY_PANEL_WIDTH / 2,
                        0,1,1);

            drawImageRotationTransparentScaled( 
                            viewMngr.getCanvasEx().m_canvas, 
                            viewMngr.getCanvasEx().m_context, 
                            this.m_levelFinishedBitmap, 
                            Desktop.C_PLAY_PANEL_WIDTH / 2, Desktop.C_PLAY_PANEL_WIDTH / 2,
                            0,1,1);                
        }
    };

    Desktop.prototype.renderPieces = function () 
    {
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            this.m_pieces[i].render();
        }
    };

    Desktop.prototype.renderSelectedPiece = function () 
    {
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            if (this.m_pieces[i].isMouseOver() === true)
            {
                this.m_pieces[i].render();
            }
        }
    };

    // ****************************************
    // Auxiliar functions
    // ****************************************
    Desktop.prototype.reset = function () 
    {
        this.m_levelFinished = false;
    }

    Desktop.prototype.loadLevel = function (_levelNumber) 
    {
        this.m_level.loadLevel(_levelNumber, this.m_playPanel, this.m_piecesPanel, this.m_pieces);  
    }

    Desktop.prototype.processMouseOverPieces = function () 
    {
        var pieces = this.m_piecesPanel.getPiecesCollection();
        var mouse = viewMngr.getMouseManagerInstance();

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

    Desktop.prototype.btnBack_click_controller = function (_event, _sender) 
    {
        _sender.getOnClickParent().notify(PlayFlow.C_EVENT_ON_BUTTON_BACK);
    }

    Desktop.prototype.showControls = function () 
    {
        this.m_btnBack.setEnabled(true);
        this.m_btnBack.setVisible(true);
    }; 

    Desktop.prototype.hideControls = function () 
    {
        this.m_btnBack.setEnabled(false);
        this.m_btnBack.setVisible(false);
    }; 

    Desktop.prototype.isLevelFinished = function () 
    {
        if (this.m_levelFinished === false)
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
        
            this.m_levelFinished = allPiecesAllocated;
        }

        return this.m_levelFinished;
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



