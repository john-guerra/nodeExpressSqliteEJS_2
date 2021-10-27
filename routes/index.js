let express = require("express");
let router = express.Router();

const myDB = require("../db/MySqliteDB.js");

/* GET home page. */
router.get("/", async function (req, res) {
  console.log("Got request for /");

  const fires = await myDB.getFires();

  console.log("got fires", fires);

  // render the _index_ template with the fires attrib as the list of fires
  res.render("index", { fires: fires});
});

/* GET fire details. */
router.get("/fires/:fireID", async function (req, res) {
  console.log("Got fire details");

  const fireID = req.params.fireID;

  console.log("gotfire details ", fireID);

  const fire = await myDB.getFireByID(fireID);

  console.log("Fire created");

  res.render("fireDetails", {fire: fire});
});

/* POST create fires. */
router.post("/fires/create", async function (req, res) {
  console.log("Got post create/fires");

  const fire = req.body;

  console.log("got create fire", fire);

  await myDB.createFire(fire);

  console.log("Fire created");

  res.redirect("/");
});

/* POST create fires. */
router.post("/fires/delete", async function (req, res) {
  console.log("Got post delete fire");

  const fire = req.body;

  console.log("got delete fire", fire);

  await myDB.deleteFire(fire);

  console.log("Fire deleted");

  res.redirect("/");
});


module.exports = router;
