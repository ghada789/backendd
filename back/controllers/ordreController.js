const express = require('express');
const jwt = require('jsonwebtoken');
const Ordre = require('../models/ordre');

const app = express();
app.get('/', (req, res) => {
    res.status(200).send('Welcomme to the server');
})
app.post('/ordreservice', async (req, res) => {
    try {
        let data = req.body
        
        let ordre = new Ordre({
            nom:data.nom,
            date_debut: data.date_debut,
            heure_debut:data.heure_debut,
            moyen: data.moyen,
            objet:data.objet,
            lieu:data.lieu,
            nature:data.nature

        })

        let ordreFormDb = await ordre.save()
        res.status(201).send({ message: 'ordre de service succesfuly' })
    }
    catch (error) {
        res.status(400).send({ message: 'ordre de service failed' })

    }
})
app.get('/all', async (req, res) => {
    try {
        let ordres = await Ordre.find()
        res.status(200).send(ordres)
    } catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.get('/one/:id',async (req, res) => {
    try {
        let data = req.params.id;
        let ordre = await Ordre.findOne({ _id: data })
        if (!ordre) {
            res.status(404).send({ message: "ordre not found" })
        }
        else {
            res.status(200).send(ordre)
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
module.exports=app;



















