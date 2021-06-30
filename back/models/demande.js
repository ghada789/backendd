const mongoose = require("mongoose");

const Demande = mongoose.model('demandes', {
    idDemandeur : { type: String, required: true }, 
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email:{type:String,required:true},
    telephone: { type: String, required: true },
    service: { type: String },
    capacite: { type: String },
    date_debut: { type: String },
    date_fin: { type: String },
    heure_debut: { type: String },
    heure_fin: { type: String },
    moyen: { type: String },
    objet: { type: String },
    gouvernorat: { type: String },
    lieu: { type: String, required: true },
    status: { type: String, default: "en attente" },
    statusIntervention: { type: String, default: "no" }
});

module.exports = Demande;