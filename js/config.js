define([],function(){

	function Config () {

	}

	Config.prototype.init = function () {

	};

	// Returns a random number between min and max
	Math.randomRange = function (min, max) {
		return Math.random() * (max - min) + min;
	}

	return new Config();
})