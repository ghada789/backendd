const mongoose = require("mongoose");
const User = mongoose.model('users', {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true},
    


    role:{type:String,default:'user'},
    date :{
        type:String,
        default:Date.now

    }
});
module.exports=User;