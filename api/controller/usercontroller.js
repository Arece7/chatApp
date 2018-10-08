var userMongo = require('../model/mongoose');
var chatmod=require('../model/chatmongo');
var personalmod=require('../model/personalChatModel');
const jwt = require('jsonwebtoken');   


function encrypt(pass) {
    var encryPass = require('crypto')
        .createHash('sha1')
        .update(pass)       // Hash the password using SHA1 algorithm.
        .digest('base64');
    return encryPass;
}
//for registration purpose
exports.registration = function (req, res) {
    
    var e = /\S+@\S+\.\S+/;    //regex for email
    var n = /^[a-zA-Z\s]+$/;   //regex for name
    var p=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //regex for password
    
    if(!(n.test(req.body.fname)&& n.test(req.body.lname)) ){                 
                                                          //validation
       var response = {
            "error": true,
            "message": "invalid name",
        };
        return res.status(404).send(response);
    }
    if(!e.test(req.body.email))
    {                 
                                              //validation
    var response = {
     "error": true,
     "message": "invalid email id ",
       };
    return res.status(404).send(response);
   }
   if(!p.test(req.body.password))
    {                 
                                                    //validation
    var response = {
     "error": true,
     "message": "plz input Minimum eight characters, at least one letter and one number ",
       };
    return res.status(404).send(response);
   }
    
    var mail = req.body.email;
    var db = new userMongo();
    var response = {};
    db.FirstName = req.body.fname;
    db.LastName = req.body.lname;
    db.Email = req.body.email;
    db.Password = encrypt(req.body.password);
    //to find the data from database
    userMongo.find({"emailId":mail}, function (err, data) {

        if(data.length>0){                   //validation

            var response = {
                "error": true,
                "message": "Login credentials already Exist!!",
            };
            return res.status(404).send(response);
        }else{
        db.save(function (err)        //for saving the data in database
        {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error in adding data",
                    "err": err
                };
                
            } else {
                response = {
                    "error": false,
                    "message": "Successfully Registered"
                };
            }
            return res.status(200).send(response);
            
        });}
    })
    
    
}

//for log in purposes
exports.login = function (req, res) {
    var e = /\S+@\S+\.\S+/;
    var p=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!e.test(req.body.email))
    {                 
                                                //validation
    var response = {
     "error": true,
     "message": "invalid email id ",
       };
    return res.status(404).send(response);
   }
   if(!p.test(req.body.password))
    {                 
                                                   //validation
    var response = {
     "error": true,
     "message": "plz input Minimum eight characters, at least one letter and one number ",
       };
    return res.status(404).send(response);
   }
    var mail = req.body.email;
    var pass = encrypt(req.body.password);
    var response = {};
    
    userMongo.find({"Email":mail,"Password":pass}, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
           
            response = {
                "error": true,
                "message": "Error fetching data"
            };
            return res.status(200).send(err);
        } else {
            
            if(data.length>0){

         //if user log in success, generate a JWT token for the user with a secret key
          
         var token = jwt.sign({data}, 'privatekey', { expiresIn: '15d' },(err, token) => {
                if(err) { console.log(err) }    
                var t = token;
                var userid = data[0]._id;  //to get logged user id
                var username = data[0].FirstName+" "+data[0].LastName;
               var response = {
                "error": false,
                "message": "login sucessful",
                 "token":t,
                 "userid": userid,
                 "username": username
            };
            return res.status(200).send(response); 
        });   
     } 
        else{
            var response = {
                "error": false,
                "message": "Invalid credentials ERROR: Could not log in"
            };
            return res.status(404).send(response);
        }
        }
        
    });    
 }

//to get the members present in database
 exports.memberList = function (req, res) {

    var userid = req.params.id;  //to store id in userid
    var response = {};
    var arrList = [];
    var responseList = {};
    userMongo.find({                //to find that use who is logged in
        "_id": {
            $ne: (userid)
        }
    }, function (err, data) {

        if (err) {
            response = {
                "message": "Error fetching data"
            }
        } else {
            response = {
                "message": data
            };
        }
        if(response.message.length)       //for pushing the user info 
        for (var i = 0; i < response.message.length; i++) {
            arrList.push({

                username: response.message[i].FirstName + ' ' + response.message[i].LastName,
                userid: response.message[i]._id
            });
        }
        responseList = {
            "data": arrList
        }
        return res.status(200).json(responseList);
    });

}
exports.chatAddHistory = function (userid, username, message, dateTime) {

    var response = {};
    var db = new chatmod();

    db.userid = userid;
    db.username = username
    db.message = message;
    db.dateTime = dateTime;


    db.save(function (err) {

        if (err) {

            
            response = {
                'Success': "false",
                'message': "Error in Data Fetching",
                'error':err
            }
        } else {

            response = {

                'Success': "true",
                'message': "Message Data successfully Saved into DataBase "
            }
        };
        console.log(response);
    })

}


exports.chatlist = function (req, res) {

    var respo = {};

    chatmod.find({}, function (err, data) {

        if (err) {

            respo = {
                'Success': "false",
                'message': "Error in fetching data "
            }
        } else {
            respo = {
                'Success': 'true',
                'message': data
            }
        }

      
        return res.status(200).send(respo);
    });
}
exports.personalMessgAdd = function(senderId, senderName, receiverId, receiverName, message, dateTime){


    var db = new personalmod();

    // receiverid = receiverId;
    // senderid = senderId;

    db.senderId = senderId;
    db.senderName = senderName;
    db.receiverId = receiverId;
    db.receiverName = receiverName;
    db.message = message;
    db.dateTime = dateTime;

    db.save(function(err){


        if (err) {

            response = {
                'Success': "false",
                'message': "Error in Data Fetching"
            }
        } else {

            response = {

                'Success': "true",
                'message': "Message Data successfully Saved into DataBase "
            }
        };
        console.log(response);

    })
}

exports.personalChatlist = function (req, res) {

    var respo = {};

    var receiverid = req.params.receiverid;
    var senderid = req.params.senderid; 

    personalmod.find({$or:[{'receiverId': receiverid, 'senderId': senderid},{'receiverId': senderid, 'senderId': receiverid}]}, function (err, data) {

        if (err) {

            respo = {
                'Success': "false",
                'message': "Error in fetching data "
            }
        } else {
            respo = {
                'Success': 'true',
                'message': data
            }
        }

       // console.log(respo)
        return res.status(200).send(respo);
    });
}


