function Desktop() 
{
    this.m_viewParent = null;

    this.m_type = Desktop.C_Desktop_TYPE_NOT_SET;

    this.m_playPanel = null; 
    this.m_piecesPanel = null; 
    this.m_currentLevel = null;

    this.m_desktopBitmap = null;

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

    };

    // ****************************************
    // Load level
    // ****************************************
    Desktop.prototype.loadLevel = function (_levelNumber, _piecesPanel) 
    {
        var images = new Array();

        _piecesPanel.reset();

        if (_levelNumber === 1)
        {
            _piecesPanel.addPiece("puzzle_peppa_clip-1.png", 50, 50);
            _piecesPanel.addPiece("puzzle_peppa_clip-2.png", 150, 150);
        }

        _piecesPanel.refresh();
    };

};



