const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function getFires() {
  const db = await open({
    filename : "./db/fires.db",
    driver: sqlite3.Database
  });
  console.log("Connected to db");

  const stmt = await db.prepare(`
    SELECT * FROM Fires
    WHERE size > @size;
  `);

  const params = {
    "@size" : 190
  };

  const fires = await stmt.all(params);

  for (let f of fires) {
    console.log(f);
  }



}




getFires();

