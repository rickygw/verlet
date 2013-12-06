define([

],function(

){

	function Point (x, y) {

		this.GRAVITY = 0.6;

		this.x = x;
		this.y = y;

		this.px = x;
		this.py = y;

		this.fx = 0;
		this.fy = 0;

		// display

		this.graphics = null;
		this.avatar = null;

		this.createAvatar();
	}

	Point.prototype.apply_force = function (delta) {

		// delta is something i dont know
		delta *= delta;	// a.k.a. delta squared

		this.fy = this.GRAVITY;	// first apply world constant forces

		// actually apply the force (a.k.a. change the point's position)
		this.x += this.fx * delta;
		this.y += this.fy * delta;

		// clear forces
		// to-do: maybe we could wait and clear this after .update?
		// would doing so allow us to accumlate forces over multiple apply_force calls?
		this.fx = this.fy = 0;
	};

	Point.prototype.verlet = function () {

		// next x/y is current x/y minus the previous x/y (VERLET!).
		// not sure about the *2 though
		var nx = (this.x * 2) - this.px;
		var ny = (this.y * 2) - this.py;

		this.px = this.x;
		this.py = this.y;

		this.x = nx;
		this.y = ny;
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