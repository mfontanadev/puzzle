LevelFactory.C_LEVELS_COUNT = 3;

function LevelFactory () 
{ 
    this.m_viewParent = null;
    this.m_pieces = null;

    LevelFactory.prototype.init = function (_viewParent, _pieces) 
    {
        this.m_viewParent = _viewParent;
        this.m_pieces = _pieces;
    }

    LevelFactory.prototype.loadLevel = function (_levelNumber, _playPanel, _piecesPanel) 
    {
        chClearArray(this.m_pieces);
        if (_levelNumber === 0)
        {
            this.addPiece("puzzle_peppa_clip-1.png", 290, 324);
            this.addPiece("puzzle_peppa_clip-2.png", 178, 143);
            _playPanel.setBackgroundImage('puzzle_peppa_background.png');
        }
        else if (_levelNumber === 1)
        {
            this.addPiece("puzzle_peppa2_clip-1.png", 81, 255);
            this.addPiece("puzzle_peppa2_clip-2.png", 77, 98);
            this.addPiece("puzzle_peppa2_clip-3.png", 345, 220);
            this.addPiece("puzzle_peppa2_clip-4.png", 194, 390);
            _playPanel.setBackgroundImage('puzzle_peppa2_background.png');
        }
        else if (_levelNumber === 2)
        {
            this.addPiece("puzzle_peppa3_clip-1.png", 203, 283);
            this.addPiece("puzzle_peppa3_clip-2.png", 359, 399);
            this.addPiece("puzzle_peppa3_clip-3.png", 87, 401);
            this.addPiece("puzzle_peppa3_clip-4.png", 91, 264);
            _playPanel.setBackgroundImage('puzzle_peppa3_background.png');
        }

       _piecesPanel.initPiecesWithThumbails(this.m_pieces);
    };

    LevelFactory.prototype.addPiece = function (_pieceImage, _xTarget, _yTarget) 
    {
        var pieceItem = new Piece();

        pieceItem.init(this.m_viewParent, _pieceImage, _xTarget, _yTarget);

        this.m_pieces.push(pieceItem);
    };
};

