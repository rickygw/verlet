define([

],function(

){

	function Point (x, y) {

		this.GRAVITY = 0.6;

		this.x = x;
		this.y = y;

		this.px = x;
		this.py = y;

		this.vx = 0;
		this.vy = 0;

		// display

		this.graphics = null;
		this.avatar = null;

		this.createAvatar();
	}

	Point.prototype.apply_force = function ( x, y ) {

		this.vx += x;
		this.vy += y;
	};

	Point.prototype.update = function ( delta ) {

		delta *= delta;

		var nx = this.x + ((this.x - this.px) *0.99) + ((this.vx/2) *delta);
		var ny = this.y + ((this.y - this.py) *0.99) + ((this.vy/2) *delta);

		this.px = this.x;
		this.py = this.y;

		this.x = nx;
		this.y = ny;

		this.vx = this.vy = 0;
	};


	// Display
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

	Point.prototype.createAvatar = function () {

		this.graphics = new createjs.Graphics();
		this.avatar = new createjs.Shape(this.graphics);

		this.graphics.clear();
		this.graphics.beginFill(createjs.Graphics.getRGB(100,100,100));
		this.graphics.drawCircle(0,0,3);
		this.graphics.endFill();

		this.avatar.alpha = 0.4

		return this.avatar;
	};

	Point.prototype.updateAvatar = function () {

		this.avatar.x = this.x;
		this.avatar.y = this.y;
	};

	return Point;

});