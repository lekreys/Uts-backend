const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    Name:{
        type:String,
        required : true
    },
    Nim:{
        type:String,
        required : true
    },
    Fakultas:{
        type:String,
        required : true
    },
    Jurusan:{
        type:String,
        required : true
    },
    tel:{
        type:String,
        required : true
    },
    details: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required : true
    },
    createAt:{
        type:Date,
        default : Date.now()
    },
    updateAt:{
        type:Date,
        default : Date.now()
    },
});
module.exports = mongoose.model('Customer' ,CustomerSchema);





