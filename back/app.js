const express = require('express');
const cors = require('cors');

require('./db/config')

const userController = require('./controllers/userController.js')
const demandeController= require('./controllers/demandeController.js')
const ordreController = require('./controllers/ordreController')
const offreController = require('./controllers/offreController')
const rapportController = require('./controllers/rapportController.js')
const senderController = require('./mailer/mailer.controller')

var facturesRouter = require('./factures/factures')
const app = express();

app.use(cors())
app.use(express.json())

app.use('/user', userController)
app.get('/', (req, res) => {
    res.status(200).send('we are on home');
})

app.use('/demande',demandeController)
app.use('/ordre', ordreController)
app.use('/offre', offreController)
app.use('/rapport',rapportController)
app.use('/sender',senderController);
app.use('/factures', facturesRouter)

app.get('/', (req, res) => {
    res.status(200).send('we are on home');
})


app.listen(3000, () => {
    console.log('serveur startedd');
})
