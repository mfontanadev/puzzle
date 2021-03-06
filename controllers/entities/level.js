function Level () 
{ 
    this.m_pieces = null;

    Level.prototype.init = function (_pieces) 
    {
        this.m_pieces = _pieces;
    }

    Level.prototype.loadLevel = function (_levelNumber, _playPanel, _piecesPanel) 
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
        else if (_levelNumber === 3)
        {
            this.addPiece("puzzle_peppa4_clip-1.png", 212, 340);
            this.addPiece("puzzle_peppa4_clip-2.png", 84, 91);
            this.addPiece("puzzle_peppa4_clip-3.png", 152, 313);
            this.addPiece("puzzle_peppa4_clip-4.png", 230, 140);
            this.addPiece("puzzle_peppa4_clip-5.png", 366, 360);
            _playPanel.setBackgroundImage('puzzle_peppa4_background.png');
        }
        else if (_levelNumber === 4)
        {
            this.addPiece("puzzle_peppa5_clip-1.png", 213, 341);
            this.addPiece("puzzle_peppa5_clip-2.png", 84, 259);
            this.addPiece("puzzle_peppa5_clip-3.png", 314, 387);
            this.addPiece("puzzle_peppa5_clip-4.png", 372, 248);
            _playPanel.setBackgroundImage('puzzle_peppa5_background.png');
        }

       _piecesPanel.initPiecesWithThumbails(this.m_pieces);
    };

    Level.prototype.addPiece = function (_pieceImage, _xTarget, _yTarget) 
    {
        var pieceItem = new Piece();

        pieceItem.init(_pieceImage, _xTarget, _yTarget);

        this.m_pieces.push(pieceItem);
    };
};

