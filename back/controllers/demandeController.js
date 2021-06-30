const express = require('express');
const jwt = require('jsonwebtoken');
const Demande = require('./../models/demande');
// const authJwt = require("../middleware/authJwt");
const app = express();
app.get('/', (req, res) => {
    res.status(200).send('Welcomme to the server');
})


app.post('/sngfeed',//[authJwt.verifyToken],
    async (req, res) => {

        //console.log(authJwt.verifyToken)
        try {
            let data = req.body

            let demande = new Demande({
                idDemandeur: data.idDemandeur,
                nom: data.nom,
                prenom: data.prenom,
                email:data.email,
                telephone: data.telephone,
                service: data.service,
                capacite: data.capacite,
                date_debut: data.date_debut,
                date_fin: data.date_fin,
                heure_debut: data.heure_debut,
                heure_fin: data.heure_fin,
                moyen: data.moyen,
                objet: data.objet,
                lieu: data.lieu,
                gouvernorat: data.gouvernorat

            })

            let demandeFormDb = await demande.save()
            res.status(201).send({ message: 'demande succesfuly' })
        }
        catch (error) {
            res.status(400).send({ message: 'demande failed' })

        }
    })
app.get('/all', async (req, res) => {
    try {
        let demandes = await Demande.find()
        res.status(200).send(demandes)
    } catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.get('/one/:id', async (req, res) => {
    try {
        let data = req.params.id;
        let demandes = await Demande.findOne({ _id: data })
        if (!demandes) {
            res.status(404).send({ message: "demande not found" })
        }
        else {
            res.status(200).send(demandes)
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.put('/update_info/:id', async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body    // récuperer body eli jey ml Front
        let updatedDemande = await Demande.findOneAndUpdate({ _id: id }, data) // paramétre theni data
        if (!updatedDemande) {
            res.status(404).send({ message: "demande not found" })
        }
        else {
            res.status(200).send({ message: "demande updated" })
        }
    }
    catch (error) {
        res.status(400).send({ message: "API failed", error })
    }
})
app.post('/show', async (req, res) => {
    try {
        let data = req.body.id;
        let demande = await Demande.findById({ _id: data })
        if (!demande) {
            res.status(404).send({ message: "demande not found" })
        }
        else {
            res.status(200).send(demande)
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.delete('/remove/:id', async (req, res) => {
    try {
        let data = req.params.id;
        let deletedDemande = await Demande.findOneAndDelete({ _id: data })
        if (!deletedDemande) {
            res.status(404).send({ message: "demande not found" })
        }
        else {
            res.status(200).send({ message: "demande deleted" })
        }

    }
    catch (error) {
        res.status(400).send({ message: "API failed", error })
    }


})
app.get('/emailuser/:email', async (req, res) => {
    try {
        let demandes = await Demande.find({ email: req.body.email })
        res.status(200).send(demandes)
    } catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})


module.exports = app;