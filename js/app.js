define([
	'config',
	'gui',

	'simulation'

],function(
	Config,
	GUI,

	Simulation	

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

		Config.Simulation = new Simulation( Config.DOM.canvas );
		Config.Simulation.init();

		// Start
		// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
		Config.Simulation.start();

	};

	return new App();
});