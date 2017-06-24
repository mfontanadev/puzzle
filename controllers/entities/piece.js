Piece.C_ALLOCATION_TOLERANCE = 20;  // in pixels.

function Piece () 
{ 
    this.m_bitmap = null;
    this.m_rectThumbail = null;
    this.m_xTarget = 0;
    this.m_yTarget = 0;
    this.m_thumbailScale = 1;
    this.m_x = 0;
    this.m_y = 0;
    this.m_rc = new ChRect();
    this.m_mouseOver = false;
    this.m_viewParent = null;
    this.m_avoidRecursivity = false;

    Piece.prototype.init = function (_viewParent, _pieceImage, _xTarget, _yTarget) 
    {
        this.m_viewParent = _viewParent;

        if (_pieceImage !== "")
            this.m_bitmap = this.m_viewParent.getBitmapManagerInstance().getImageByName(_pieceImage);

        this.m_rectThumbail = new ChRect(); 
        this.m_xTarget = _xTarget;
        this.m_yTarget = _yTarget;
    };

    Piece.prototype.collisionRectangle = function () 
    {
        if (this.m_bitmap !== null)
        {
            updateRectangleWithScale(this.m_bitmap, this.m_x, this.m_y, this.getScale(), this.m_rc);
        }

        return this.m_rc;
    };

    Piece.prototype.clicDown = function (_cx, _cy) 
    {
        if (this.m_mouseOver === false)
        {
            this.m_mouseOver = collisionPointRect(_cx, _cy, this.collisionRectangle());
        }
        else
        {
            if (this.isOverTarget(_cx, _cy) === true)
            {
                this.updateMouseOverPosition(this.m_xTarget, this.m_yTarget);
             
                if (this.m_avoidRecursivity === false)
                {
                    this.m_viewParent.getSoundManagerInstance().playSoundByName("allocated.wav");

                    this.m_avoidRecursivity = true;
                }
            }
            else
            {
                this.updateMouseOverPosition(_cx, _cy);
                this.m_avoidRecursivity = false;
            }
        }
    }

    Piece.prototype.isOverTarget = function (_cx, _cy) 
    {
        return (modulo(_cx, _cy, this.m_xTarget, this.m_yTarget) < Piece.C_ALLOCATION_TOLERANCE);
    }

    Piece.prototype.isPieceAllocated = function () 
    {
        return (this.m_allocated === true);
    }

    Piece.prototype.updateMouseOverPosition = function (_cx, _cy) 
    {
        this.m_x = _cx;
        this.m_y = _cy;
    }

    Piece.prototype.clicUp = function (_cx, _cy) 
    {
        if (this.m_mouseOver === true)
        {
            this.m_mouseOver = false;
            if (this.isOverTarget(_cx, _cy) === true)
            {
                this.m_allocated = true;
            }
            else
            {
                this.m_x = this.m_rectThumbail.getCenterX();
                this.m_y = this.m_rectThumbail.getCenterY();
            }
        }
    }

    Piece.prototype.getScale = function () 
    {
        if (this.m_mouseOver === true || this.m_allocated === true)
        {
            return 1;
        }
        else
        {
            return this.m_thumbailScale;
        }
    }

    Piece.prototype.render = function (_canvas, _context) 
    {
       drawImageRotationTransparentScaled(_canvas, _context, this.m_bitmap, this.m_x, this.m_y, 0, 1, this.getScale());
    
       //renderCircle(_canvas, _context, this.m_xTarget, this.m_yTarget, 2, "yellow");
    }

    Piece.prototype.setThumbailRectangle = function (_rect) 
    {
        this.m_rectThumbail = _rect;

        this.updateThumbailScale();

        this.m_x = this.m_rectThumbail.getCenterX();
        this.m_y = this.m_rectThumbail.getCenterY();
    }

    Piece.prototype.updateThumbailScale = function () 
    {
        var imageLongestSide = this.m_bitmap.width;
        if (this.m_bitmap.height > this.m_bitmap.width)
            imageLongestSide = this.m_bitmap.height;

        var rectShortesttSide = this.m_rectThumbail.width();
        if (this.m_rectThumbail.height() < this.m_rectThumbail.width())
            rectShortesttSide = this.m_rectThumbail.height();

        this.m_thumbailScale = rectShortesttSide / imageLongestSide;
    };    

    Piece.prototype.isMouseOver = function () 
    {
        return (this.m_mouseOver === true);
    };
};

