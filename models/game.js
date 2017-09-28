var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = Schema({
  name: {type: String},
  status: {type: String},
  user: [{ type: Schema.ObjectId, ref: 'User'}],
  board: { any: [{}] },
});

GameSchema
.virtual('url')
.get(function () {
  return '/game/'+this._id;
});

GameSchema
.virtual('controller')
.get(function () {
  return name+'Controller';
});

module.exports = mongoose.model('Game', GameSchema);
