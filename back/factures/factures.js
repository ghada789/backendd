var express = require('express');
const facturesController = require('./factures.controller');

var router = express.Router();


/* return list of notifications for current user */
router.get('/:idDemand',facturesController.getPreFacture)
router.get('/demands/acceptedDemands',facturesController.getAcceptedDemands)
router.get('/demands/acceptedDemand/:idIntervention',facturesController.getFinalFacture)
router.get('/demands/intervention/:idIntervention',facturesController.getInterventionById)


module.exports = router;