'use strict';

var sha256 = require('js-sha256');

var mongoose = require('mongoose'),
  HashModel = mongoose.model('Hashes');

/*
 * @param req   object containing information about the HTTP request that raised the event
 * @param res   object to send back the desired HTTP response
 */
exports.createHash = function(req,res) {
    var hashDigest = sha256(req.body.message);

    // Check for duplicates by message rather than by hash digest
    // since there's possibility of hash collision even though unlikely
    HashModel.find({message : req.body.message}, function(err,docs) {
        if(docs.length) {
            // Don't add duplicate
            res.json({digest : hashDigest});
        } else {
            var new_hash = new HashModel({digest : hashDigest, message : req.body.message});
            new_hash.save(function(err,hash) {
                if(err)
                    res.send(err);
                res.json({digest : hash.digest});
            });
        }
    }); 
};

/*
 * @param req   object containing information about the HTTP request that raised the event
 * @param res   object to send back the desired HTTP response
 */

exports.getHashMessage = function(req,res) {
    HashModel.find({digest : req.params.hashDigest}, {_id : false, message : true}, function(err,hash) {
        if(hash.length) {
            if(err) {
                res.send(err);
            }
            res.send(hash + '\n');
        } else {
            res.status(404).send('Error 404: Not Found\n');
        }        
    });
};

