var mongoose = require('mongoose');
var regSchema = mongoose.Schema;
var chatSchema = new regSchema({

    'userid': {
        type: String,
        required: true
    },
    'username': {
        type: String,
    
    },
    'message': {
        type: String,
        required: true
    },
    'dateTime': {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('chatData', chatSchema);