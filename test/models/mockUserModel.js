
var User = function User(user_id){
  this.user_id = user_id
  this.userName = 'Bob '+user_id;
  this.role = '';

  this.exec = function(callback){
    callback(null, this);
  };

};

module.exports.findById = function(user_id) {
  return new User(user_id);
};

module.exports.find = function() {};
