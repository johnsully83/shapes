$(document).ready(function() {
    function Shape(numSides, color, left, top) {
        if(!numSides) {
            numSides = this.randomNumberOfSides();
        }
        
        if(!color) {
            color = this.randomColor();  
        }
        
        if(!left) {
            left = this.randomLeft();
        }
        
        if(!top) {
            top = this.randomTop();
        }
        
        this.left = left;
        this.top = top;
        this.numSides = numSides;
        this.color = color;
		
		this.element = this.print();
    }
	
    Shape.prototype.randomNumberOfSides = function() {
        var test = Math.random();
        
        if(test < 0.25) {
             return 1;   
        } else if(test < 0.50) {
             return 3;   
        } else if(test < 0.75) {
             return 4;   
        } else {
             return 5;   
        }
    };
    
    Shape.prototype.randomColor = function() {
        var test = Math.random();
        
        if(test < 0.2) {
             return 'red';   
        } else if(test < 0.4) {
             return 'blue';   
        } else if(test < 0.6) {
             return 'orange';   
        } else if(test < 0.8) {
             return 'green';   
        } else {
             return 'purple';   
        }
    };
    
    Shape.prototype.randomLeft = function() {
        var test = Math.random();
        
        return test*$(document).width();
    };
    
    Shape.prototype.randomTop = function() {
        var test = Math.random();
        
        return test*$(document).height();
    };
	
    Shape.prototype.print = function() {
        var element = $('<div />');
        
        if(this.numSides == 1) {
            element.addClass('circle');
        } if(this.numSides == 3) {
            element.addClass('triangle');
        } else if(this.numSides == 4) {
            element.addClass('square');
        } else if(this.numSides == 5) {
            element.addClass('pentagon');
        }
        
        element.addClass(this.color).css({
            top: this.top+'px',
            left: this.left+'px'
        });
        
        return element;
    };
    
    Shape.prototype.bounce = function() {
        $(this.element).data('bounce', true);
        
        var position = $(this.element).position();
        var pageWidth = $(document).width();
        
        var random = Math.round((Math.random() * 500) - 250);
        
        if(position.left + random + 25 > pageWidth || position.left + random < 0) {
             random = -random;   
        }
        
        var horizontal = "+="+random;
        
        random = Math.round((Math.random() * 500) - 250);
        
        var pageHeight = $(document).height();
        
        if(position.top + random + 25 > pageHeight || position.top + random < 0) {
             random = -random;   
        }
        
        var vertical = "+="+random;
		var that = this;
        
        $(this.element).animate({
            left: horizontal,
            top: vertical
        }, {
            duration: 2000,
            complete: function() {
                if($(that.element).data('bounce')) {
                    that.bounce();
                }
            }
        });
		
		return this;
    };
    
    Shape.prototype.spin = function() {
		var that = this;
	
		$(this.element).rotate({
            angle:0, 
            animateTo:360, 
            callback: function() {
                that.spin();
            },
            easing: function (x,t,b,c,d){
                return c*(t/d)+b;
            }
       });
	   
	   return this;
	};
    
    Shape.prototype.go = function(element) {
		element.append(this.element);
	};    
    
    function addShape() {
        new Shape().bounce().spin().go($('#shape-box'));
    }
    
    $('#add-shape').on('click', addShape);
    
    for(var i=0; i<10; i++) {
        addShape();
    }
});