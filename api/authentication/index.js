var jwt = require('jsonwebtoken');
var auth = function(req, res, next){
var token=req.headers["token"];

var response = {
      'message': "Unauthorised Entry "
};
      console.log("in auth ", token);
      jwt.verify(token,'privatekey', function(err, decoded) {
            if(err)
            {
                  console.log(err)
                  return res.status(401).send(response);
            }
            else{
                  console.log(decoded);
                  next();
            }
           
      });
 
          
     // next();
}
module.exports = auth;