function PlayPanel() 
{
    this.m_visible = true;

    this.m_bitmap = null;
    this.m_x1 = 0;
    this.m_y1 = 0;
    this.m_width = 0;
    this.m_height = 0;

    PlayPanel.prototype.init = function (_x1, _y1, _width, _height) 
    {
        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_width = _width;
        this.m_height = _height;

        this.m_bitmap = null;
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
        renderRectangleFilled( 
                    viewMngr.getCanvasEx().m_canvas, 
                    viewMngr.getCanvasEx().m_context, 
                    this.m_x1, this.m_y1,
                    this.m_width, this.m_height, "gray");
        
        drawImageScaled( 
                        viewMngr.getCanvasEx().m_canvas, 
                        viewMngr.getCanvasEx().m_context, 
                        this.m_bitmap, 
                        this.m_x1, this.m_y1,
                        this.m_width, this.m_height);
    };

    // ****************************************
    // Auxiliars
    // ****************************************
    PlayPanel.prototype.setBackgroundImage = function (_imageName) 
    {
        this.m_bitmap = viewMngr.getBitmapManagerInstance().getImageByName(_imageName);
    }; 

};
