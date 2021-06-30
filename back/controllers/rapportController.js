const express = require('express');
const jwt = require('jsonwebtoken');
const Demande = require('../models/demande');
const Rapport = require('./../models/rapport');

const app = express();
app.get('/', (req, res) => {
    res.status(200).send('Welcomme to the server');
})
app.post('/add', async (req, res) => {
    try {
        let data = req.body

        const demand =  await Demande.findById(data?.ordre)
        demand.statusIntervention="yes";
        
        let rapport = new Rapport({
            ordre: demand?._id,
            date: data.date,
            lieu: data.lieu,
            personnel: data.personnel,
            dureedu: data.dureedu,
            dureea: data.dureea,
            duree_transdu: data.dureetransdu,
            duree_transa: data.duree_transa,
            donnees: data.donnees,
            moyens: data.moyens,
            observations: data.observations,
        })
        await demand.save();
        let rapportFormDb = await rapport.save()
        res.status(201).send({ message: 'rapport succesfuly' })
    }
    catch (error) {
        res.status(400).send({ message: 'rapport failed' })

    }
})
app.get('/one/:id', async (req, res) => {
    try {
        let data = req.params.id;
        let rapport = await Rapport.findOne({ _id: data })
        if (!rapport) {
            res.status(404).send({ message: "rapport not found" })
        }
        else {
            res.status(200).send(rapport)
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.get('/all', async (req, res) => {
    try {
        let rapports = await Rapport.find()
        res.status(200).send(rapports)
    } catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
module.exports = app;