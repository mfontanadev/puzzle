
function Desktop() 
{
    this.m_viewParent = null;

    this.m_type = Desktop.C_Desktop_TYPE_NOT_SET;

    this.m_playPanel = null; 
    this.m_piecesPanel = null; 
    this.m_currentLevel = null;

    this.m_desktopBitmap = null;
    this.m_pieces = new Array();

    Desktop.prototype.init = function (_viewParent) 
    {
        this.m_viewParent = _viewParent;

        this.m_playPanel = new PlayPanel();
        this.m_playPanel.init(this.m_viewParent, 10, 10, 460, 460);

        this.m_piecesPanel = new PiecesPanel();
        this.m_piecesPanel.init(this.m_viewParent, 480, 10, 150, 460);
        this.loadLevel(1, this.m_piecesPanel);

        this.m_desktopBitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName('desktop_theme1.png');
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
    };

    Desktop.prototype.render = function () 
    {
        this.m_playPanel.render();

        drawImageTransparent( 
            this.m_viewParent.m_canvasEx.m_canvas, 
            this.m_viewParent.m_canvasEx.m_context, 
            this.m_desktopBitmap, 
            0, 0, 1);

        this.m_piecesPanel.render();

        this.renderPieces() 
    };

    Desktop.prototype.renderPieces = function () 
    {
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            this.m_pieces[i].render(this.m_viewParent.m_canvasEx.m_canvas, this.m_viewParent.m_canvasEx.m_context);

        }
    };

    // ****************************************
    // Auxiliar functions
    // ****************************************
    Desktop.prototype.loadLevel = function (_levelNumber, _piecesPanel) 
    {
        chClearArray(this.m_pieces);
        
        if (_levelNumber === 1)
        {
            this.addPiece("puzzle_peppa_clip-1.png", 290, 324);
            this.addPiece("puzzle_peppa_clip-2.png", 178, 143);
    
        }

       _piecesPanel.initPiecesWithThumbails(this.m_pieces);
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

        for (index = 0; index < pieces.length; index++) 
        {
            if (pieces[index].isMouseOver() === true)
            {
                mouseOverPIeceIndex = index;
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

};



