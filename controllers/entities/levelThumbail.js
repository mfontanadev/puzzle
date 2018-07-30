LevelThumbail.C_ALLOCATION_TOLERANCE = 60;  // in pixels.

function LevelThumbail () 
{ 
    this.m_bitmap = null;
    this.m_rc = new ChRect();
    this.m_avoidSoundRecursivity = false;
    this.m_x = 0;
    this.m_y = 0;
    this.m_bitmapScale = 1;
    this.m_levelIndex = -1;
    this.m_mouseDown = false;

    this.m_levelBlocked = true;
    this.m_levelSolved = false;

    this.m_bitmapBlocked_true = null; 
    this.m_bitmapBlocked_false = null; 

    this.m_bitmapSolved_up = null; 
    this.m_bitmapSolved_down = null; 

    LevelThumbail.prototype.init = function (_levelIndex, _levelThumbailImage) 
    {
        this.m_levelIndex = _levelIndex;

        if (_levelThumbailImage !== "")
        {
            this.m_bitmapBlocked_true = viewMngr.getBitmapManagerInstance().getImageByName("close_padlock.png"); 
            this.m_bitmapBlocked_false = viewMngr.getBitmapManagerInstance().getImageByName("open_padlock.png"); 
            this.m_bitmapSolved_up = viewMngr.getBitmapManagerInstance().getImageByName("star_up.png"); 
            this.m_bitmapSolved_down = viewMngr.getBitmapManagerInstance().getImageByName("star_down.png"); 

            this.m_bitmap = viewMngr.getBitmapManagerInstance().getImageByName(_levelThumbailImage);
        }
    };

    LevelThumbail.prototype.render = function () 
    {   
 
        renderRectangleFilled(
            viewMngr.getCanvasEx().m_canvas, 
            viewMngr.getCanvasEx().m_context, 
            this.m_rc.m_x1, this.m_rc.m_y1, 
            this.m_rc.width(), this.m_rc.height(), "gray");     
        
        drawImageRotationTransparentScaled(
           viewMngr.getCanvasEx(), 
           viewMngr.getCanvasEx().m_context, 
           this.m_bitmap, this.m_x, this.m_y, 
           0, 1, 
           this.getScale());

        drawImageRotationTransparentScaled(
            viewMngr.getCanvasEx(), 
            viewMngr.getCanvasEx().m_context, 
            viewMngr.getBitmapManagerInstance().getImageByName("thumbail_background.png"), 
            this.m_x, this.m_y, 
            0, 1, 1);

        if (this.m_levelSolved === true)
        {
            drawImageRotationTransparentScaled(
                viewMngr.getCanvasEx(), 
                viewMngr.getCanvasEx().m_context, 
                this.m_bitmapSolved_up, 
                this.m_rc.m_x1 + 30, this.m_rc.m_y1 - 30 + this.m_rc.height(), 
                0, 1, 
                0.40);
        }
        else
        {
            drawImageRotationTransparentScaled(
                viewMngr.getCanvasEx(), 
                viewMngr.getCanvasEx().m_context, 
                this.m_bitmapSolved_down, 
                this.m_rc.m_x1 + 30, this.m_rc.m_y1 - 30 + this.m_rc.height(), 
                0, 1, 
                0.40);
        }   

        if (this.m_levelBlocked === true)
        {
            drawImageRotationTransparentScaled(
                viewMngr.getCanvasEx(), 
                viewMngr.getCanvasEx().m_context, 
                this.m_bitmapBlocked_true, 
                this.m_rc.m_x1 - 20 + this.m_rc.width(),  this.m_rc.m_y1 - 20 + this.m_rc.height(), 
                0, 1, 
                0.25);
        }
        else
        {
            drawImageRotationTransparentScaled(
                viewMngr.getCanvasEx(), 
                viewMngr.getCanvasEx().m_context, 
                this.m_bitmapBlocked_false, 
                this.m_rc.m_x1 - 20 + this.m_rc.width(),  this.m_rc.m_y1 - 20 + this.m_rc.height(), 
                0, 1, 
                0.25);
        }           
    }

    LevelThumbail.prototype.collisionRectangle = function () 
    {
        //if (this.m_bitmap !== null)
        //{
        //    updateRectangleWithScale(this.m_bitmap, this.m_x, this.m_y, this.getScale(), this.m_rc);
       // }
        return this.m_rc;
    };

    LevelThumbail.prototype.setCollitionRectangle = function (_rect) 
    {
        this.m_rc = _rect;
        this.m_x = this.m_rc.getCenterX();
        this.m_y = this.m_rc.getCenterY();

        this.updateLevelThumbailScale();
    }
    
    LevelThumbail.prototype.getScale = function () 
    {
        return this.m_bitmapScale;
    }

    LevelThumbail.prototype.updateLevelThumbailScale = function () 
    {
        if (this.m_bitmap !== null)
        {
            var imageLongestSide = this.m_bitmap.width;
            if (this.m_bitmap.height > this.m_bitmap.width)
                imageLongestSide = this.m_bitmap.height;

            var rectShortesttSide = this.m_rc.width();
            if (this.m_rc.height() < this.m_rc.width())
                rectShortesttSide = this.m_rc.height();

            this.m_bitmapScale = rectShortesttSide / imageLongestSide;
        }
    };    

    LevelThumbail.prototype.getLevelIndex = function () 
    {
        return this.m_levelIndex;
    }

    LevelThumbail.prototype.clicDown = function (_cx, _cy) 
    {
        if (this.m_mouseDown === false)
        {
            this.m_mouseDown = collisionPointRect(_cx, _cy, this.collisionRectangle());
        }
    }

    LevelThumbail.prototype.clicUp = function (_cx, _cy) 
    {
        var result = false;

        if (this.m_mouseDown === true)
        {
             result = collisionPointRect(_cx, _cy, this.collisionRectangle());

             this.m_mouseDown = false;
        }

        return result;
    }    
};

