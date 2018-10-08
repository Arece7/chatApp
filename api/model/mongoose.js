 var mongoose    =   require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/userdata', { useNewUrlParser: true });
// create instance of Schema
var regSchema = mongoose.Schema;
// create schema
var usersSchema  = new regSchema({
    "FirstName":{type:String,required:true},
     "LastName":{type:String,required:true},
     "Email":{type:String,required:true,unique:true},
     "Password" : {type:String,required:true}
});
// create model if not exists.
module.exports = mongoose.model('userData',usersSchema);