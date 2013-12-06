define([
],
function (

) {

	function module () {

		this.items = {};
		this.list = [];
		this.length = 0;
	}

	module.prototype.addItem = function ( key_, item_ ) {

		item_.key = key_;
		item_.index = this.list.length;
		//item_.next = null;
		//item_.prev = null;
		this.items[key_] = item_;
		this.list.push( this.items[key_] );

		this.length = this.list.length;

		// solve next/prev

	};

	module.prototype.removeItemByKey = function ( key_ ) {

		if ( this.items[key_] ) {
			this.list.splice( this.items[key_].index, 1 );
			delete this.items[key_];
			this.updateIds();
		}
	};

	module.prototype.getItemByKey = function ( key_ ) {

		return this.items[key_] || null;
	};

	module.prototype.getItemsByKey = function ( keylist_, removeDups_ ) {

		var i,imax;
		var result = [];
		var uniq = {};

		removeDups_ = ( typeof removeDups_ !== "undefined" && removeDups_ !== null ) ? removeDups_:false;

		// clean unordered list, set to false, later set to true when its used for first time
		if ( removeDups_ === true ) {

		}

		imax = keylist_.length;
		for(i=0;i<imax;i++) {

			if ( (removeDups_ === true && typeof uniq[keylist_[i]] === "undefined") || removeDups_ === false ) {
				result.push( this.items[keylist_[i]] );
				uniq[ keylist_[i] ] = true;
			}
		}

		return result;
	};

	module.prototype.getItemAtIndex = function ( index_ ) {

		return this.list[index_];
	};

	/*
	 * Return a single item from a lookup
	 */
	module.prototype.getItemWhere = function ( propname_, value_, strict_ ) {

		strict_ = strict_ || false;
		var result = [];
		var reqObject = {};
			reqObject[propname_] = value_;

		result = this.getItemsWhere( reqObject, strict_, 1 );

		if ( result.length === 0 ) {
			return null;
		} else {
			return result[0];
		}
	};

	/*
	 * Return multiple items from a lookup
	 * pass a string starting with "%" as a lookup value to lookup similar to MySQL LIKE clause
	 * i.e. {someproperty:"%somevalue"}
	 */
	module.prototype.getItemsFromListWhere = function ( list_, keyvaluemap_, strict_, limit_ ) {

		var i,imax;
		var j,jmax;
		var k, passed;
		var result = [];
		var mylist = list_;
		var item = null;
		strict_ = strict_ || false;
		limit_ = limit_ || 9999;

		imax = mylist.length;

		for(i=0;i<imax;i++) {	// for each item in this dictionary
			passed = true;
			item = this.items[ mylist[i] ];

			for ( k in keyvaluemap_ ) {		// for each key / value we want to check

				if ( typeof keyvaluemap_[k] == "string" && keyvaluemap_[k].substr(0,1) == "%" ) {		// a "like" comparison

					if ( item[k].indexOf( keyvaluemap_[k].substr(1) ) > -1 ) {	// found match
						// do nothing
					} else {	// no match found
						passed = false;
						break;	// break out of this for..each, no need to check other props since we already failed
					}

				} else {	// bool comparison
					if ( strict_ === true ) {
						if ( item[k] !== keyvaluemap_[k] ) {
							passed = false;
							break;
						}
					} else {
						if ( item[k] != keyvaluemap_[k] ) {
							passed = false;
							break;
						}
					}
				}
			}

			if ( passed === true ) {
				result.push ( item );
				if ( result.length >= limit_ ) {
					break;
				}
			}
		}

		return result;
	};

	module.prototype.getItemsWhere = function ( keyvaluemap_, strict_, limit_ ) {

		var list = [];
		var i,k;

		i=0;
		for(k in this.items) {
			list[i] = k;
			i++;
		}

		return this.getItemsFromListWhere( list, keyvaluemap_, strict_, limit_ );
	};

	module.prototype.getAll = function () {

		return this.list;
	};

	/*module.prototype.length = function () {

		return this.list.length;
	};*/

	module.prototype.shuffle = function () {
		var o = this.list;
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		this.list = o;
		this.updateIds();
	};


	/*
	 *	Private
	 */


	module.prototype.sortByKeyList = function ( keylist_ ) {

		var i,imax;
		var newlist = [];
		var item;

		imax = keylist_.length;
		for(i=0;i<imax;i++) {
			item = this.getItemsByKey( keylist_[i] );
			this.items[keylist_[i]].index = i;
			newlist.push( this.items[keylist_[i]] );
		}

		this.list = newlist;
	};

	module.prototype.updateIds = function () {

		var i,imax;

		imax = this.list.length-1;
		for(i=imax; i>=0; i--) {
			this.list[i].index = i;
		}

		this.length = imax;
	};


	return module;

});