const mongoose = require("mongoose");
const Rapport = mongoose.model('rapports', {
    ordre: { type: String, required: true },
    date: { type: String, required: true },
    lieu: { type: String, required: true },
    personnel: { type: String, required: true },
    dureedu: { type: String },
    dureea: { type: String },
    duree_transdu: { type: String },
    duree_transa: { type: String },
    donnees: { type: String },
    moyens: { type: String },
    observations: { type: String },
});
module.exports = Rapport;