const mongoose = require("mongoose");
const Ordre = mongoose.model('ordres', {
    nom:{type:String,required:true},
    date_debut: { type:String},
    heure_debut: { type: String},
    moyen: { type: String},
    objet: { type: String},
   
 lieu: { type: String, required: true },
 nature:{type:String}
});
module.exports=Ordre;