const app = require("../index");
const authJwt = require("../Authentification/middleware/authJwt");
const uuid = require("uuid");
const hash = require("argon2");

app.post(
  "/v3/:user(driver||provider||admin)/add",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      // const password = await hash(req.body.password);
      app.db.transaction(async (trx) => {
        const id = uuid.v1().toLocaleUpperCase();

        console.log("here");
        if (req.params.user === "driver") {
          await trx.table("app_user").insert({
            id: id,
            username: req.body.username,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            descriminator: req.body.descriminator,
          });
          console.log("here1");
          await trx.table("driver").insert({
            id: id,
            descriminator: req.body.descriminator,
            zone: req.body.zone,
            vehicule: req.body.vehicule,
          });

          await trx
            .table("vehicle")
            .update({ status: 1 })
            .where("id", "=", req.body.vehicule);
        } else if (req.params.user === "provider") {
          console.log("here2");
          await trx.table("app_user").insert({
            id: id,
            username: req.body.username,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            descriminator: "PROVIDER",
          });
          await trx.table("provider").insert({
            id: id,
            codeFiscal: req.body.codeFiscal,
            codePostal: req.body.codePostal,
            company: req.body.company,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            agence: req.body.agence,
          });
        } else {
          await trx.table("app_user").insert({
            id: id,
            username: req.body.username,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            descriminator: "REGULER_USER",
          });
          await trx
            .table("agence_admin")
            .insert({ agence: req.body.agence, admin: id });
        }
        console.log("here3");
        await trx
          .table("user_privilege")
          .insert({
            users: id, //updated in postgres
            privilege: req.body.privilege,
          })
          .then(() => {
            res.json({
              code: "success",
              content: req.body,
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
);

app.get("/v3/driver/list", [authJwt.verifyToken], async (req, res) => {
  try {
    /* const zone = (await app.db.table("zone")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const vehicule = (await app.db.table("vehicule")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
 */
    const driver = await app.db
      .from("driver " + " as p")
      .select("*")
      .join("app_user as u ", "u.id", "p.id");

    res.json({
      code: "success",
      content: driver,
    });
  } catch (error) {}
});
app.get("/v3/provider/list", [authJwt.verifyToken], async (req, res) => {
  try {
    /*
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
 */
    const provider = await app.db
      .from("provider " + " as p")
      .select("*")
      .join("app_user as u ", "u.id", "p.id");

    res.json({
      code: "success",
      content: provider,
    });
  } catch (error) {}
});

///////////////list admin agence
app.get("/v3/adminagence/list", async (req, res) => {
  try {
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const admin = (await app.db.table("app_user")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const admins = (await app.db.from("agence_admin " + " as p")).map((e) => ({
      ...e,
      agence: agence[e.agence],
      admin: admin[e.admin],
    }));

    res.json({
      code: "success",
      content: admins,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/v3/list/driver/user", [authJwt.verifyToken], async (req, res) => {
  try {
    const zones = (await app.db.table("zone")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const vehicule = (await app.db.table("vehicle")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const user = req.userId;
    const [agence] = await app
      .db("agence_admin")
      .select("agence")
      .where("admin", "=", user);
    const zone = await app
      .db("zone")
      .select("id")
      .where("agence", "=", agence.agence);

    const driver = (
      await app.db
        .from("driver " + " as p")
        .select("*")
        .join("app_user as u ", "u.id", "p.id")
        .where(
          "zone",
          "IN",
          zone.map((e) => e.id)
        )
    ).map((e) => ({
      ...e,
      vehicule: vehicule[e.vehicule],
      zone: zones[e.zone],
    }));

    res.send({ code: "success", content: driver });
  } catch (error) {
    console.log(error);
  }
});

app.get("/v3/list/provider/user", [authJwt.verifyToken], async (req, res) => {
  try {
    const user = req.userId;
    const [agence] = await app
      .db("agence_admin")
      .select("agence")
      .where("admin", "=", user);
    const agence1 = (
      await app.db.table("agence").where("id", "=", agence.agence)
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const provider = (
      await app.db
        .from("provider " + " as p")
        .select("*")
        .join("app_user as u ", "u.id", "p.id")
        .where("agence", "=", agence.agence)
    ).map((e) => ({
      ...e,

      agence: agence1[e.agence],
    }));
    res.send({ code: "success", content: provider });
  } catch (error) {
    console.log(error);
  }
});
app.get("/v3/users/list/", async (req, res) => {
  let users = await app.db.table("app_user");
  if (users.length !== 0) {
    res.json(users);
  } else {
    res.send({ notice: "No users found!" });
  }
});

app.get("/v3/users/list/v3", async (req, res) => {
  let users = await app.db.table("driver as d ").join("app_user as u ", "u.id", "d.id");
  if (users.length !== 0) {
    res.json(users);
  } else {
    res.send({ notice: "No users found!" });
  }
});