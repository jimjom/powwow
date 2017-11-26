var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    userName: {type: String, required: true, min: 3, max: 100}
});

// Virtual for this genre instance URL
UserSchema
.virtual('user_id')
.get(function () {
  return this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);
