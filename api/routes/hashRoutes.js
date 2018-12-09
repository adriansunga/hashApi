'use strict';
module.exports = function(app) {
    var hashController = require('../controllers/hashController');
    
    app.post('/messages', [hashController.createHash]);
    app.get('/messages/:hashDigest', [hashController.getHashMessage]);
};
