var mongoose = require('mongoose');

var powwow_user = function(){
	this.user_name = 'test';
	
	this.constructor = function(name){
	};
};
powwow_user.prototype.constructor = function(name){
		this.user_name = name;
}
module.exports = powwow_user;

