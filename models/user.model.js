var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var objectId=mongoose.Schema.Types.ObjectId;

var usersSchema = new Schema({
   _id:{type:mongoose.Schema.Types.ObjectId, auto:true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
},{
    versionKey:false

});

// user is the database that we created in mangodb
const users = mongoose.model('users',usersSchema);
module.exports=users;