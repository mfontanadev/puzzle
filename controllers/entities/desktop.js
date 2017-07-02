Desktop.C_LEVELS_COUNT = 3;
Desktop.C_PLAY_PANEL_WIDTH = 460;
Desktop.C_PIECES_PANEL_WIDTH = 150;

Desktop.C_LEVEL_SELECTOR_WIDTH = 180;
Desktop.C_LEVEL_SELECTOR_HEIGHT = 60;

function Desktop() 
{
    this.m_viewParent = null;

    this.m_type = Desktop.C_Desktop_TYPE_NOT_SET;

    this.m_playPanel = null; 
    this.m_piecesPanel = null; 
    this.m_levelSelector = null;

    this.m_desktopBitmap = null;
    this.m_pieces = new Array();

    this.m_currentLevelIndex = 0;

    this.m_btnLevelSelector = null;

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

        this.m_levelSelector = new LevelSelector();
        this.m_levelSelector.init(this.m_viewParent,  
                                    (Desktop.C_PLAY_PANEL_WIDTH / 2) + 15, Desktop.C_PLAY_PANEL_WIDTH / 2, 
                                    Desktop.C_LEVEL_SELECTOR_WIDTH, Desktop.C_LEVEL_SELECTOR_HEIGHT,
                                    this);

        this.m_currentLevelIndex = 0;
        this.loadLevel(this.m_currentLevelIndex, this.m_piecesPanel);

        this.m_desktopBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName('desktop_theme1.png');

        // Open/Close level selector button.   
        var toolbarCenterX = Desktop.C_PLAY_PANEL_WIDTH / 2;
        var toolbarCenterY = Desktop.C_PLAY_PANEL_WIDTH;
        this.m_btnLevelSelector = new CanvasControl();
        this.m_btnLevelSelector.initButtonStyle(this.m_viewParent.m_canvasEx, 
                                toolbarCenterX - 15 + 15, toolbarCenterY - 30, 30, 30, "");
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
        this.m_levelSelector.implementGameLogic();
    };

    Desktop.prototype.render = function () 
    {
        this.m_playPanel.render();

        this.m_piecesPanel.render();

        drawImageTransparent( 
            this.m_viewParent.m_canvasEx.m_canvas, 
            this.m_viewParent.m_canvasEx.m_context, 
            this.m_desktopBitmap, 
            0, 0, 1);

        this.renderPieces() 

        this.m_btnLevelSelector.render();
        this.m_levelSelector.render();
    };

    Desktop.prototype.renderPieces = function () 
    {
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            this.m_pieces[i].render(this.m_viewParent.m_canvasEx, this.m_viewParent.m_canvasEx.m_context);
        }
    };

    // ****************************************
    // Auxiliar functions
    // ****************************************
    Desktop.prototype.loadLevel = function (_levelNumber, _piecesPanel) 
    {
        chClearArray(this.m_pieces);

        if (_levelNumber === 0)
        {
            this.addPiece("puzzle_peppa_clip-1.png", 290, 324);
            this.addPiece("puzzle_peppa_clip-2.png", 178, 143);
            this.m_playPanel.setBackgroundImage('puzzle_peppa_background.png');
        }
        else if (_levelNumber === 1)
        {
            this.addPiece("puzzle_peppa2_clip-1.png", 290, 324);
            this.addPiece("puzzle_peppa2_clip-2.png", 178, 143);
            this.m_playPanel.setBackgroundImage('puzzle_peppa2_background.png');
        }
        else if (_levelNumber === 2)
        {
            this.addPiece("puzzle_peppa3_clip-1.png", 290, 324);
            this.addPiece("puzzle_peppa3_clip-2.png", 178, 143);
            this.m_playPanel.setBackgroundImage('puzzle_peppa3_background.png');            
        }

       _piecesPanel.initPiecesWithThumbails(this.m_pieces);
    };

    Desktop.prototype.nextLevel = function () 
    {
        this.m_currentLevelIndex++;
        if (this.m_currentLevelIndex >= this.getLevelsCount())
        {
            this.m_currentLevelIndex = this.getLevelsCount() - 1;
        }
        this.loadLevel(this.m_currentLevelIndex, this.m_piecesPanel);
    };

    Desktop.prototype.previousLevel = function () 
    {
        this.m_currentLevelIndex--;
        if (this.m_currentLevelIndex < 0)
        {
            this.m_currentLevelIndex = 0;
        }
        this.loadLevel(this.m_currentLevelIndex, this.m_piecesPanel);
    };

    Desktop.prototype.getLevelsCount = function () 
    {
        return Desktop.C_LEVELS_COUNT;
    };

    Desktop.prototype.addPiece = function (_pieceImage, _xTarget, _yTarget) 
    {
        var pieceItem = new Piece();

        pieceItem.init(this.m_viewParent, _pieceImage, _xTarget, _yTarget);

        this.m_pieces.push(pieceItem);
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
        _sender.getOnClickParent().m_levelSelector.show();
    }
};



