var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var networkSchema = new Schema({
  networkGenes: String,
  eval: Number,
  version: Number
});

networkSchema.statics.findMax = function (versionToFind, callback) {
  this.findOne({ version: versionToFind }) // 'this' now refers to the Member class
    .sort('-eval')
    .exec(callback);
}

// the schema is useless so far
// we need to create a model using it
var Network = mongoose.model('Network', networkSchema);

// make this available to our users in our Node applications
module.exports = Network;