var express= require('express');   //importing express
var router=express.Router();       //router() of express is called

var users=require('./controller/usercontroller');
var auth=require('./authentication');
router.get('/personalChatlist/:receiverid/and/:senderid',auth,users.personalChatlist);
router.get('/users/:id/userlist',auth, users.memberList);
router.get('/chatlist',auth,users.chatlist);

module.exports = router;