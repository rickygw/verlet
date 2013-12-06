define([

	'dictionary',
	'display',
	'point'
],function(

	Dictionary,
	Display,
	Point
){

	function Simulation ( canvas ) {

		// parameters
		this.fps = 60;
		this.SPEED = 1;
		this.DAMPING = 0.75;
		this.updateInterval = -1;

		// display
		this.canvas = canvas;
		this.worldWidth = 1024;
		this.worldHeight = 768;		

		// bodies
		this.points = null;
	}

	Simulation.prototype.init = function () {

		this.canvas.attr({'width':this.worldWidth,'height':this.worldHeight});
		this.display = new Display(this.canvas);
		this.display.init();

		this.createPoints();
	};

	Simulation.prototype.createPoints = function () {

		var p,i,total;

		this.points = new Dictionary();

		total = 500;
		i = 0;
		while(i++ < total) {
			p = new Point( Math.randomRange(0,this.worldWidth), Math.randomRange(0,200) );
			p.apply_force(100, 0);	// a little force test
			this.display.addAvatar( p.avatar );
			this.points.addItem('point'+i, p);
		}
	};


	// Engine
	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

	Simulation.prototype.update = function () {

		var iter = 6;
		var i,p,delta;

		delta = this.SPEED / iter;

		i = this.points.length;
		while(i--) {
			this.points.list[i].apply_force(0, 50);
			this.points.list[i].update(delta);
		}

		this.solveWalls();

		i = this.points.length;
		while(i--) {
			this.points.list[i].updateAvatar();
		}

		this.display.update();
	};

	Simulation.prototype.solveWalls = function () {

		var i,p,vx,vy,floor;

		floor = this.worldHeight-100;

		i = this.points.length;
		while(i--) {

			p = this.points.list[i];

			if ( p.y > floor ) {
				vy = p.py - p.y; // speed and direction we moved last time, in reverse
				p.y = floor;
				p.py = p.y - vy * this.DAMPING;
			}
		}
	};

	Simulation.prototype.start = function () {

		this.stop();
		this.updateInterval = setInterval( this.update.bind(this), 1000/this.fps );
	};

	Simulation.prototype.stop = function () {

		clearInterval( this.updateInterval );
	};

	return Simulation;
});