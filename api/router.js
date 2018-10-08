var express= require('express');
var router=express.Router();
var app = express();
var users=require('./controller/usercontroller')
var authRoute=require('./authRouter')

router.post('/signup', users.registration);
router.post('/login',users.login);

router.use('/auth',authRoute);

module.exports=router;
