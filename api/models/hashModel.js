'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hashSchema = new Schema({
    digest: String,
    message: String
});

module.exports = mongoose.model('Hashes', hashSchema);

