//here first i imported the mongoose and created the student database schema 
//also imported the validator to validate the email of the student
//and then i created the model named Student and attach the studentschema to this model named Student
//and at last I exported the model.




const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone : {
        type:Number,
        min:10,
       
        required:true,
        unique:true
    },
    address : {
        type:String,
        required:true

    }
})

const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;