var express = require("express");
var app = express();
var socket= require('socket.io')
var users = require('./api/controller/usercontroller');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var mongoose    =   require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/userdata', { useNewUrlParser: true });
var router = require('./api/router')
app.use('/', router);
app.use(express.static('./public'))

var server=app.listen(3013);
console.log("Listening to PORT 3013");
//socket set up
 var io=socket(server);
io.on('connection', function(client) {
    console.log("system working");

   
    client.on('chatRoomBackend', function(data) {
               
        users.chatAddHistory(data.userid, data.username, data.message, data.dateTime);
         
         io.emit('chatroomClient', data);
     })

    client.on('personalChatBackend', function(data){

        users.personalMessgAdd(data.senderId, data.senderName, data.receiverId, data.receiverName, data.message, data.dateTime)
        io.emit(data.receiverId, data);
})
});

