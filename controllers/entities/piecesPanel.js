PiecesPanel.C_COLS = 2;
PiecesPanel.C_ROWS = 3;

function Piece () 
{ 
    this.m_bitmap = null;
    this.m_rectThumbail = null;
    this.m_xTarget = 0;
    this.m_yTarget = 0;
    this.scale = 1;
};

function PiecesPanel() 
{
    this.m_viewParent = null;

    this.m_visible = true;

    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    this.m_pieces = new Array();

    PiecesPanel.prototype.init = function (_viewParent, _x1, _y1, _width, _height) 
    {
        this.m_viewParent = _viewParent;

        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;
    };

    // ****************************************
    // Main cicle: handleInputs, implementGameLogic, render
    // ****************************************
    PiecesPanel.prototype.handleInputs = function () 
    {
    };

    PiecesPanel.prototype.implementGameLogic = function () 
    {
    };

    PiecesPanel.prototype.render = function () 
    {
        /*
            renderRectangleFilled(
                        this.m_viewParent.m_canvasEx.m_canvas, 
                        this.m_viewParent.m_canvasEx.m_context, 
                        this.m_x1, this.m_y1, this.m_width, this.m_height, "red"
                        );
        */

        var rect = null;
        for (var i = 0; i < this.m_pieces.length; i++) 
        {
            rect = this.m_pieces[i].m_rectThumbail;

            renderRectangleFilled(
                        this.m_viewParent.m_canvasEx.m_canvas, 
                        this.m_viewParent.m_canvasEx.m_context, 
                        rect.m_x1, rect.m_y1, rect.width(), rect.height(), "white"
                        );
    
            if (this.m_pieces[i].m_bitmap !== null)
            {
                drawImageRotationTransparentScaled( 
                    this.m_viewParent.m_canvasEx.m_canvas, 
                    this.m_viewParent.m_canvasEx.m_context, 
                    this.m_pieces[i].m_bitmap,
                    rect.getCenterX(), rect.getCenterY(), 
                    0, 1, this.m_pieces[i].m_scale);
            }
        }


    };

    // ****************************************
    // Interface
    // ****************************************
    PiecesPanel.prototype.reset = function () 
    {
        chClearArray(this.m_pieces);
    };

    PiecesPanel.prototype.addPiece = function (_pieceImage, _xTarget, _yTarget) 
    {
        var pieceItem = new Piece();

        if (_pieceImage !== "")
            pieceItem.m_bitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName(_pieceImage);
        pieceItem.m_rectThumbail = new ChRect(); 
        pieceItem.m_xTarget = _xTarget;
        pieceItem.m_yTarget = _yTarget;

        this.m_pieces.push(pieceItem);
    };

    PiecesPanel.prototype.refresh = function () 
    {
        // Calculate thumbail rectangles.
        var piecesCount = this.m_pieces.length;
        var pieceItem = null;
        var filenameIndex = 0;
        
        var colWidth = (this.m_width + 10 - PiecesPanel.C_COLS) / PiecesPanel.C_COLS;
        var rowHeight = (this.m_height + 10 - PiecesPanel.C_ROWS) / PiecesPanel.C_ROWS;

        for (var y = 0; y < PiecesPanel.C_ROWS; y++) 
        {
            for (var x = 0; x < PiecesPanel.C_COLS; x++)
            {
                if (filenameIndex >= piecesCount)
                    this.addPiece("", 0, 0);
                
                pieceItem = this.m_pieces[filenameIndex];

                pieceItem.m_rectThumbail.initWith(
                    this.m_x1 + (x * colWidth),             this.m_y1 + (y * rowHeight), 
                    this.m_x1 + ((x + 1) * colWidth) - 10,  this.m_y1 + ((y + 1) * rowHeight) - 10);
 
                this.setImageScale(pieceItem);                

                filenameIndex++;
            } 
        }
    };

    PiecesPanel.prototype.setImageScale = function (_pieceItem) 
    {
        if (_pieceItem.m_bitmap !== null)
        {
            var imageLongestSide = _pieceItem.m_bitmap.width;
            if (_pieceItem.m_bitmap.height > _pieceItem.m_bitmap.width)
                imageLongestSide = _pieceItem.m_bitmap.height;

            var rectShortesttSide = _pieceItem.m_rectThumbail.width();
            if (_pieceItem.m_rectThumbail.height() < _pieceItem.m_rectThumbail.width())
                rectShortesttSide = _pieceItem.m_rectThumbail.height();

            _pieceItem.m_scale = rectShortesttSide / imageLongestSide;
        }
    };    

};




