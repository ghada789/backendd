const { NotFound } = require('http-errors');
const Ordre = require('../models/ordre');
const Rapport = require('../models/rapport');
const Demande = require('./../models/demande');



/*
@ApiRoute('')
*/
async function getPreFacture(idDemand) {
    try {
        const demand = await Demande.findById(idDemand);

        const startDate = demand?.date_debut;
        const endDate = demand?.date_fin;
        const startTime = demand?.heure_debut;
        const endTime = demand?.heure_fin;


        let coutMinuts = 0;
        var diffTime = Math.abs(new Date(startDate + " " + startTime) - new Date(endDate + " " + endTime));
        var diffMinutes = Math.floor(((diffTime / 1000) / 60));
        let totalMinutes = diffMinutes;

        let prixFeed = 0
        let prixReception = 0
        let prixSNG = 0

        var fourHoursPerMinut = 60 * 4
        var twoHoursPerMinut = 60 * 2
        var oneHourPerMinut = 60
        var minuts = 15

        if (demand) {

            let moyen = demand.moyen.split("+");

            for (i = 0; i < moyen.length; i++) {

                if (moyen[i].toUpperCase() === "FEED") {
                    prixFeed = totalMinutes * 2.5 * 3.31;
                }
                if (moyen[i].toUpperCase() === "RECEPTION") {
                    prixReception = 300

                }
            }

            let countNbFourHours = Math.floor(diffMinutes / fourHoursPerMinut)
            let coutFourHours = countNbFourHours * 3000
            prixSNG = prixSNG + coutFourHours

            diffMinutes = diffMinutes - countNbFourHours * fourHoursPerMinut
            console.log(diffMinutes)
            let countNbTwoHours = Math.floor(diffMinutes / twoHoursPerMinut)
            let coutTwoHours = countNbTwoHours * 2000
            diffMinutes = diffMinutes - countNbTwoHours * twoHoursPerMinut
            console.log(diffMinutes)
            prixSNG = prixSNG + coutTwoHours
            let countNbHours = Math.floor(diffMinutes / oneHourPerMinut)

            let coutHours = countNbHours * 1400
            console.log("1", diffMinutes)
            prixSNG = prixSNG + coutHours
            diffMinutes = diffMinutes - countNbHours * oneHourPerMinut

            let countMinuts = Math.floor(diffMinutes / minuts)


            diffMinutes = diffMinutes - countMinuts * minuts
            let kk = diffMinutes / minuts
            console.log("DDDDDDD ", countMinuts)
            console.log("KKKK ", kk)
            switch (countMinuts) {
                case 0:
                    {
                        if (kk != 0 && kk < 1) {
                            prixSNG = prixSNG + 500
                            countMinuts = countMinuts + 1
                        } else {
                            console.log(prixSNG)
                        }
                        break;
                    }
                case 1:
                    {
                        if (kk < 1 && kk != 0) {
                            console.log("case 1 ")
                            prixSNG = prixSNG + 1000
                            countMinuts = countMinuts + 1

                        } else {
                            prixSNG = prixSNG + 500
                        }
                        break;
                    }
                case 2:
                    {
                        if (kk < 1 && kk != 0) {
                            console.log("case 2 ")

                            prixSNG = prixSNG + 1500
                            countMinuts = countMinuts + 1


                        } else {
                            prixSNG = prixSNG + 1000
                        }
                        break;
                    }
                case 3:
                    {
                        if (kk < 1 && kk != 0) {
                            console.log("case 3 ")

                            prixSNG = prixSNG + 1400
                            countMinuts = countMinuts + 1


                        } else {
                            prixSNG = prixSNG + 1500
                        }
                        break;

                    }
            }
            coutMinuts = countMinuts * 500;

            /*               }
          
                      } */

            let totalPrix = prixFeed + prixReception + prixSNG;
            return { totalMinutes, countNbFourHours, coutFourHours, countNbTwoHours, coutTwoHours, countNbHours, coutHours, countMinuts, coutMinuts,prixFeed , prixReception , totalPrix }


        }

    } catch {
        return 'no data found'
    }

}


async function getAcceptedDemands() {
    let demands = await Demande.find({ status: "accepter" ,statusIntervention:"no" });
    return demands
}


async function calculateFinalFacture(idIntervesion) {

    try {
        const intervention = await Rapport.findById(idIntervesion);

        const startDate = intervention?.date;
        const startTime = intervention?.dureedu;
        const endTime = intervention?.dureea;

        let prixSNG = 0
        let coutMinuts = 0;
        var diffTime = Math.abs(new Date(startDate + " " + startTime) - new Date(startDate + " " + endTime));
        var diffMinutes = Math.floor(((diffTime / 1000) / 60));
        let totalMinutes = diffMinutes;


        var tenHoursPerMinut = 60 * 10;
        var fourHoursPerMinut = 60 * 4
        var twoHoursPerMinut = 60 * 2
        var oneHourPerMinut = 60
        var halfHourPerMinut = 30
        var minuts = 15

        if (intervention) {

            console.log(intervention)
            let countNbTenHours = Math.floor(diffMinutes / tenHoursPerMinut)
            let coutTenHours = countNbTenHours * 5000
            prixSNG = prixSNG + coutTenHours
            diffMinutes = diffMinutes - countNbTenHours * tenHoursPerMinut


            let countNbFourHours = Math.floor(diffMinutes / fourHoursPerMinut)
            console.log('184', countNbFourHours)
            let coutFourHours = countNbFourHours * 3000
            console.log("186")
            prixSNG = prixSNG + coutFourHours
            console.log("188")

            diffMinutes = diffMinutes - countNbFourHours * fourHoursPerMinut
            console.log("191")

            console.log(diffMinutes)
            let countNbTwoHours = Math.floor(diffMinutes / twoHoursPerMinut)
            let coutTwoHours = countNbTwoHours * 2000
            diffMinutes = diffMinutes - countNbTwoHours * twoHoursPerMinut
            console.log(diffMinutes)
            prixSNG = prixSNG + coutTwoHours


            let countNbHours = Math.floor(diffMinutes / oneHourPerMinut)
            let coutHours = countNbHours * 1400
            console.log("1", diffMinutes)
            prixSNG = prixSNG + coutHours
            diffMinutes = diffMinutes - countNbHours * oneHourPerMinut

            let countNbHalfHour = Math.floor(diffMinutes / halfHourPerMinut)
            let coutHalfHour = countNbHalfHour * 800
            prixSNG = prixSNG + coutHalfHour
            diffMinutes = diffMinutes - countNbHalfHour * halfHourPerMinut


            let countMinuts = Math.floor(diffMinutes / minuts)
            diffMinutes = diffMinutes - countMinuts * minuts
            let kk = diffMinutes / minuts
            console.log("DDDDDDD ", countMinuts)
            console.log("KKKK ", kk)
            switch (countMinuts) {
                case 0:
                    {
                        if (kk != 0 && kk < 1) {
                            prixSNG = prixSNG + 500
                            countMinuts = countMinuts + 1
                        } else {
                            console.log(prixSNG)
                        }
                        break;
                    }
                case 1:
                    {
                        if (kk < 1 && kk != 0) {
                            console.log("case 1 ")
                            prixSNG = prixSNG + 1000
                            countMinuts = countMinuts + 1

                        } else {
                            prixSNG = prixSNG + 500
                        }
                        break;
                    }
            }
            console.log("241")
            coutMinuts = countMinuts * 500;
            console.log("243")

            /*               }
          
                      } */

            let totalPrix = prixSNG;
            console.log("250")

            let prixTotalSNG = await this.getPreFacture(intervention.ordre)
            let prixTotalIntervention = { totalMinutes, countNbTenHours, coutTenHours, countNbFourHours, coutFourHours, countNbTwoHours, coutTwoHours, countNbHours, coutHours, countNbHalfHour, coutHalfHour, countMinuts, coutMinuts, totalPrix }

            return { prixTotalSNG, prixTotalIntervention }


        }

    } catch {
        return 'no data found'
    }

}


async function getInterventionById(idItervention){  
    const intervention = await Rapport.findById(idItervention)
    console.log(intervention)
    return intervention ; 
}

module.exports = {
    getPreFacture,
    getAcceptedDemands,
    calculateFinalFacture,
    getInterventionById

}