const express = require('express');
const jwt = require('jsonwebtoken');
const Offre = require('./../models/offre');

const app = express();
app.get('/', (req, res) => {
    res.status(200).send('Welcomme to the server');
})

app.post('/add', async (req, res) => {
    try {
        let data = req.body
        
        let offre = new Offre({
            message:data.message,

        })

        let offreFormDb = await offre.save()
        res.status(201).send({ message: 'offre succesfuly' })
    }
    catch (error) {
        res.status(400).send({ message: 'offre failed' })

    }
})
app.get('/all', async (req, res) => {
    try {
        let offres = await Offre.find()
        res.status(200).send(offres)
    } catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.get('/one/:id',async (req, res) => {
    try {
        let data = req.params.id;
        let offre = await Offre.findOne({ _id: data })
        if (!offre) {
            res.status(404).send({ message: "offre not found" })
        }
        else {
            res.status(200).send(offre)
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
module.exports=app;