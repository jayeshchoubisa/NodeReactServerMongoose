var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId=mongoose.Schema.Types.ObjectId;

var contactsSchema = new Schema({
   _id:{type:mongoose.Schema.Types.ObjectId, auto:true},
    name: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    contact: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    users: [{ type: objectId, ref:'users' }],
},{
    versionKey:false

});

// user is the database that we created in mangodb
const contacts = mongoose.model('contacts',contactsSchema);
module.exports=contacts;