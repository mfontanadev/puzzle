function PlayPanel() 
{
    this.m_viewParent = null;

    this.m_visible = true;

    this.m_bitmap = null;
    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    PlayPanel.prototype.init = function (_viewParent, _x1, _y1, _width, _height) 
    {
        this.m_viewParent = _viewParent;

        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;

        this.m_bitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName('puzzle_peppa_background.png');
    };

    // ****************************************
    // Main cicle: handleInputs, implementGameLogic, render
    // ****************************************
    PlayPanel.prototype.handleInputs = function () 
    {
    };

    PlayPanel.prototype.implementGameLogic = function () 
    {
    };

    PlayPanel.prototype.render = function () 
    {
        drawImageScaled( 
                    this.m_viewParent.m_canvasEx.m_canvas, 
                    this.m_viewParent.m_canvasEx.m_context, 
                    this.m_bitmap, 
                    this.m_x1, this.m_y1,
                    this.m_width, this.m_height);
    };
};



