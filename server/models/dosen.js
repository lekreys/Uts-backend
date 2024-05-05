const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DosenSchema = new Schema({
    Name:{
        type:String,
        required : true
    },
    ID:{
        type:String,
        required : true
    },
    Fakultas:{
        type:String,
        required : true
    },
    Course:{
        type:String,
        required : true
    },
    tel:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    last_educ: {
        type: String,
        required: true
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

module.exports = mongoose.model('Dosen' ,DosenSchema);
