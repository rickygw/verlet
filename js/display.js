define([

],function(

){

	function Display ( canvas ) {

		this.canvas = canvas;
	}

	Display.prototype.init = function () {

		this.stage = new createjs.Stage( this.canvas[0] );
	};

	Display.prototype.update = function () {

		this.stage.update();
	};

	Display.prototype.startUpdate = function () {

		this.stopUpdate();
		this.updateInterval = setInterval( this.update.bind(this), 1000/60 );
	};

	Display.prototype.stopUpdate = function () {

		clearInterval( this.updateInterval );
	};

	return Display;

});