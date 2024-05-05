const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    first_name:{
        type:String,
        required : true
    },
    last_name:{
        type:String,
        required : true
    },
    id:{
        type:String,
        required : true
    },
    umur:{
        type:String,
        required : true
    },
    alamat:{
        type:String,
        required : true
    },
    tempat_tanggal_lahir: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required : true
    },
    tel:{
        type:String,
        required : true
    },
    job : {
        type : String,
        require : true
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

module.exports = mongoose.model('Staff' ,StaffSchema);





