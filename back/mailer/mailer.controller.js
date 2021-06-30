const express = require('express');
const router = express.Router();
const mailerService = require('./mailer.service');


router.post('/sendMail', send);
router.post('/sendFinalFacturation', finalFacturation)
module.exports = router;

 function send(req, res, next) {
    mailerService.sendMail(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function finalFacturation(req, res, next) {
    mailerService.sendFinalFacturation(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
