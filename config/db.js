//27017

const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/reactpoc',
 { useNewUrlParser: true });

mongoose.connection.on('error',err=>{
    console.log(err);
});
mongoose.connection.on('connected',res=>{
    console.log('connected');
});
