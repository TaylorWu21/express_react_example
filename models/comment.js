var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  updated_at : Date
});

module.exports = mongoose.model( 'Comment', Comment );