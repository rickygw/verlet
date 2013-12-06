define([
	'config',
	'gui',

	'display'

],function(
	Config,
	GUI,

	Display

){

	function App () {

	}

	App.prototype.init = function () {

		window.Config = Config;
		Config.init();

		// Instances
		// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

		Config.App = this;

		// DOM
		// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

		Config.DOM = {};
		Config.DOM.canvas = $('#display');

		// Setup
		// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

		Config.Display = new Display( Config.DOM.canvas );
		Config.Display.init();
		Config.Display.startUpdate();

	};

	return new App();
});