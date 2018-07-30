PiecesPanel.C_COLS = 2;
PiecesPanel.C_ROWS = 3;

function PiecesPanel() 
{
    this.m_visible = true;

    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    this.m_thumbails = new Array();
    this.m_pieces = null;

    PiecesPanel.prototype.init = function (_x1, _y1, _width, _height) 
    {
        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;

        this.initThumbialArray();        
    };

    PiecesPanel.prototype.initThumbialArray = function () 
    {
        var colWidth = (this.m_width + 10 - PiecesPanel.C_COLS) / PiecesPanel.C_COLS;
        var rowHeight = (this.m_height - 65 - PiecesPanel.C_ROWS) / PiecesPanel.C_ROWS;
        var thumbailItem = null;

        for (var y = 0; y < PiecesPanel.C_ROWS; y++) 
        {
            for (var x = 0; x < PiecesPanel.C_COLS; x++)
            {
                thumbailItem = new ChRect();

                thumbailItem.initWith(
                    this.m_x1 + (x * colWidth),             this.m_y1 + (y * rowHeight), 
                    this.m_x1 + ((x + 1) * colWidth) - 10,  this.m_y1 + ((y + 1) * rowHeight) - 10);

                this.m_thumbails.push(thumbailItem);
            } 
        }
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
        var rect = null;
        for (var i = 0; i < this.m_thumbails.length; i++) 
        {
            rect = this.m_thumbails[i].m_rectThumbail;

            renderRectangleFilled(
                        viewMngr.getCanvasEx().m_canvas, 
                        viewMngr.getCanvasEx().m_context, 
                        this.m_thumbails[i].m_x1, this.m_thumbails[i].m_y1, 
                        this.m_thumbails[i].width(), this.m_thumbails[i].height(), "white"
                        );
        }
    };

    // ****************************************
    // Interface
    // ****************************************
    PiecesPanel.prototype.initPiecesWithThumbails = function (_pieces) 
    {
        this.m_pieces = _pieces;

        // Calculate thumbail rectangles.
        var piecesCount = this.m_pieces.length;
        var pieceItem = null;
        var filenameIndex = 0;
        
        for (var y = 0; y < PiecesPanel.C_ROWS; y++) 
        {
            for (var x = 0; x < PiecesPanel.C_COLS; x++)
            {
                if (filenameIndex < piecesCount)
                {
                    pieceItem = this.m_pieces[filenameIndex];

                    pieceItem.setThumbailRectangle(this.m_thumbails[filenameIndex]);

                    filenameIndex++;
                }
            } 
        }
    };

    PiecesPanel.prototype.getPiecesCollection = function () 
    {
        return this.m_pieces;
    }
};




