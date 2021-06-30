const facturesService = require('../factures/factures.service')

/* get Pre Facture  */
function getPreFacture(req, res, next) {
    console.log(req.params)
    facturesService.getPreFacture(req.params.idDemand)
        .then(preFacture => res.json({ status: 200, message: "Operation is done successfully", data: preFacture }))
        .catch(err => res.json({ status: 400, message: 'Bad Request ', errors: [{ message: err, code: "ER002" }] }))


}


function getAcceptedDemands(req, res, next) {
    console.log(req.params)
    facturesService.getAcceptedDemands()
        .then(demands => res.json({ status: 200, message: "Operation is done successfully", data: demands }))
        .catch(err => res.json({ status: 400, message: 'Bad Request ', errors: [{ message: err, code: "ER002" }] }))


}

function getFinalFacture(req, res, next) {
    console.log(req.params)
    facturesService.calculateFinalFacture(req.params.idIntervention)
        .then(demands => res.json({ status: 200, message: "Operation is done successfully", data: demands }))
        .catch(err => res.json({ status: 400, message: 'Bad Request ', errors: [{ message: err, code: "ER002" }] }))


}

function getInterventionById(req, res, next) {
    console.log(req.params)
    facturesService.getInterventionById(req.params.idIntervention)
        .then(intervention => res.json({ status: 200, message: "Operation is done successfully", data: intervention }))
        .catch(err => res.json({ status: 400, message: 'Bad Request ', errors: [{ message: err, code: "ER002" }] }))


}

module.exports = {
    getPreFacture,
    getAcceptedDemands,
    getFinalFacture,
    getInterventionById
}