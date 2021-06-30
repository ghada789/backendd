
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const Demande = require('./../models/demande');

module.exports = { sendMail, sendFinalFacturation }

async function sendMail(body) {
  console.log("Body here :: ", body)
  nodemailer.createTestAccount(async (err, account) => {
    let transporter = nodemailer.createTransport(smtpTransport({

      host: 'smtp.gmail.com', port: 587, requireTLS: true, auth: { user: "Application.Test.Project@gmail.com", pass: "ApplicationTest45" },

    }));
    let demand = await Demande.findById(body?.idDemand);

    if (body?.status === 1 && demand) {
      demand.status = "accepter"

      await demand.save()

      //accept demand
      var mailOptions = {
        from: 'Service Commercial',
        to: body?.email, // Recepient email address. Multiple emails can send separated by commas
        subject: 'Prix de votre demande offre',
        html:
          `
        <table cellspacing="0" border="0">
	<colgroup width="145"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="125"></colgroup>
	<colgroup width="64"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="64"></colgroup>
	<tbody><tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan="6" height="20" align="center" valign="bottom" bgcolor="#FFFFCC"><font color="#9C6500">Prix d'offre</font></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="3" height="21" align="left" valign="bottom"><font color="#000000">Totale minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan="3" align="center" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalMinutes}</td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbFourHours}</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>3000DT</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutFourHours}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbTwoHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>2000DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutTwoHours}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 1 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 1 heure</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>1400DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutHours}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="21" align="left" valign="bottom"><font color="#000000">Nombre 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countMinuts}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>500DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutMinuts}DT</td>
	</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="4" height="21" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">TOTALE=</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font> ${(body?.prixDemand?.totalPrix + body?.prixDemand?.prixFeed+ body?.prixDemand?.prixReception).toFixed(3)}DT</td>
	</tr>
</tbody></table>
        `
      };

    }
    else {

      // decline demand
      demand.status = "refuser";
      await demand.save();
      var mailOptions = {
        from: 'Service Commercial',
        to: body?.email, // Recepient email address. Multiple emails can send separated by commas
        subject: 'Welcome Email',
        text:
          ' Demande de réservation est refusée   '




      };


    }


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

    });
  });
}

//DONE
async function sendFinalFacturation(body) {
  console.log("Body here :: ", body)
  nodemailer.createTestAccount(async (err, account) => {
    let transporter = nodemailer.createTransport(smtpTransport({

      host: 'smtp.gmail.com', port: 587, requireTLS: true, auth: { user: "Application.Test.Project@gmail.com", pass: "ApplicationTest45" },

    }));
    let template;

    if (body.prixDemand.prixFeed === 0 && body.prixDemand.prixReception === 0) {
      console.log("prix feed  , prix reception")
      var templateSNG = `
      <table cellspacing="0" border="0">
	<colgroup width="145"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="125"></colgroup>
	<colgroup width="64"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="64"></colgroup>
	<tbody><tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan="6" height="20" align="center" valign="bottom" bgcolor="#FFFFCC"><font color="#9C6500">Prix d'offre</font></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="3" height="21" align="left" valign="bottom"><font color="#000000">Totale minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan="3" align="center" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalMinutes} Minutes</td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbFourHours}</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>3000DT</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutFourHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbTwoHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>2000DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutTwoHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 1 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br>${body?.prixDemand?.countNbHours}</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 1 heure</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>1400DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="21" align="left" valign="bottom"><font color="#000000">Nombre 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countMinuts}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>500DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutMinuts} DT</td>
	</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="4" height="21" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">TOTALE=</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalPrix.toFixed(3)} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">Totale à payer HT</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalPrix.toFixed(3) }DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="21" align="center" valign="bottom"><font color="#000000">Prix Totale </font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${(body?.prixDemand?.totalPrix).toFixed(3)}DT</td>
	</tr>
</tbody></table>`
      template = templateSNG;
    }

    //Done
    if (body.prixDemand.prixReception === 0 && body.prixDemand.prixFeed != 0) {
      var template2SNGFEED = `
      <table cellspacing="0" border="0">
	<colgroup width="145"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="125"></colgroup>
	<colgroup width="64"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="64"></colgroup>
	<tbody><tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan="6" height="20" align="center" valign="bottom" bgcolor="#FFFFCC"><font color="#9C6500">Prix d'offre</font></td>
		</tr>
    <tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="3" height="21" align="left" valign="bottom"><font color="#000000">Totale minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan="3" align="center" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalMinutes}</td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbFourHours}</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>3000DT</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutFourHours}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbTwoHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>2000DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutTwoHours}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 1 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br>${body?.prixDemand?.countNbHours}</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 1 heure</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>1400DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutHours}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="21" align="left" valign="bottom"><font color="#000000">Nombre 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countMinuts}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>500DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutMinuts}DT</td>
	</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="4" height="21" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">TOTALE=</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalPrix.toFixed(3)}</td>
	</tr>

	<tr>
		<td colspan="6" height="21" align="center" valign="bottom"><font color="#000000"><br></font></td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan="6" height="20" align="center" valign="bottom" bgcolor="#FFFFCC"><font color="#9C6500">Facture</font></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="3" height="20" align="left" valign="bottom"><font color="#000000">Totale minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan="3" align="center" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.totalMinutes} Minutes</td>
		</tr>
	<tr>
		<td style="border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 10 heures</font></td>
		<td style="border-bottom: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbTenHours}</td>
		<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 10 heures</font></td>
		<td style="border-bottom: 1px solid #000000" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutTenHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 4 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutFourHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 4 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutFourHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbTwoHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutTwoHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 1 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixTotalIntervention?.countNbHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 1 heure</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixTotalIntervention?.coutHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 30 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixTotalIntervention?.countNbHalfHour}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 30 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixTotalIntervention?.coutHalfHour} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countMinuts}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutMinuts} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="4" height="20" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">TOTALE=</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.totalPrix.toFixed(3)} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">Prix FEED</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixDemand.prixFeed.toFixed(3)} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">Totale à payer HT</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.total} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="21" align="center" valign="bottom"><font color="#000000">Prix Totale </font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${(body.total).toFixed(3)  } DT</td>
	</tr>
</tbody></table>`
      template = template2SNGFEED;
    }

    //DONE
    if (body.prixDemand.prixFeed != 0 && body.prixDemand.prixReception != 0) {

      var template3SNGFEEDRECEPTION = `
      <table cellspacing="0" border="0">
	<colgroup width="145"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="125"></colgroup>
	<colgroup width="64"></colgroup>
	<colgroup width="115"></colgroup>
	<colgroup width="64"></colgroup>
	<tbody><tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan="6" height="20" align="center" valign="bottom" bgcolor="#FFFFCC"><font color="#9C6500">facture</font></td>
		</tr>
    <tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="3" height="21" align="left" valign="bottom"><font color="#000000">Totale minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan="3" align="center" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalMinutes}</td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbFourHours}</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 4 heures</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>3000DT</td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutFourHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbTwoHours} DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>2000DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutTwoHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 1 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countNbHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 1 heure</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>1400DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutHours} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="21" align="left" valign="bottom"><font color="#000000">Nombre 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.countMinuts}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>500DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.coutMinuts} DT</td>
	</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="4" height="21" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">TOTALE=</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body?.prixDemand?.totalPrix} DT</td>
	</tr>
	<tr>
		<td colspan="6" height="21" align="center" valign="bottom"><font color="#000000"><br></font></td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan="6" height="20" align="center" valign="bottom" bgcolor="#FFFFCC"><font color="#9C6500">Facture</font></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="3" height="20" align="left" valign="bottom"><font color="#000000">Totale minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan="3" align="center" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.totalMinutes} Minutes</td>
		</tr>
	<tr>
		<td style="border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 10 heures</font></td>
		<td style="border-bottom: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbTenHours}</td>
		<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 10 heures</font></td>
		<td style="border-bottom: 1px solid #000000" align="center" valign="bottom"><font color="#000000"><br></font>5000 DT</td>
		<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutTenHours}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 4 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbFourHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 4 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>3000 DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutFourHours}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbTwoHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 2 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>2000DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutTwoHours}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 1 heures</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbHours}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 1 heure</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>1000DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutHours}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 30 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countNbHalfHour}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 30 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>800DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutHalfHour}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign="bottom"><font color="#000000">Nombre 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.countMinuts}</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût 15 minutes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>500DT</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">Coût totale</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.coutMinuts}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="4" height="20" align="center" valign="bottom"><font color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left" valign="bottom"><font color="#000000">TOTALE=</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixTotalIntervention.totalPrix}</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">Prix FEED</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.prixDemand.prixFeed.toFixed(3)}DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">Prix Récéption</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="right" valign="bottom" sdval="300" sdnum="1033;"><font color="#000000">${body.prixDemand.prixReception}</font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">Totale à payer HT</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.total} DT</td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="20" align="center" valign="bottom"><font color="#000000">TVA</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="right" valign="bottom" sdval="300" sdnum="1033;"><font color="#000000">300 DT</font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan="5" height="21" align="center" valign="bottom"><font color="#000000">Prix Totale </font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="left" valign="bottom"><font color="#000000"><br></font>${body.total + 300} DT</td>
	</tr>
</tbody></table>`
      template = template3SNGFEEDRECEPTION;
    }

    //accept demand
    var mailOptions = {
      from: 'Service Commercial',
      to: body?.email, // Recepient email address. Multiple emails can send separated by commas
      subject: 'Votre Facture',
      html: template
    };



    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

    });
  });
}