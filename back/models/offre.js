const mongoose = require("mongoose");
const Offre = mongoose.model('offres', {
    message:{type:String,required:true}

});
module.exports=Offre;