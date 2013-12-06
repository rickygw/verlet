define([

],function(

){

	function Display ( canvas ) {

		this.canvas = canvas;
	}

	Display.prototype.init = function () {

		this.stage = new createjs.Stage( this.canvas[0] );
	};

	Display.prototype.addAvatar = function ( displayobject ) {

		this.stage.addChild(displayobject);
	};

	Display.prototype.update = function () {

		this.stage.update();
	};

	return Display;

});