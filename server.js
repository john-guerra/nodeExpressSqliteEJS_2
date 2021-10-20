const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function getFires() {
  const db = await open({
    filename : "./db/fires.db",
    driver: sqlite3.Database
  });
  console.log("Connected to db");
}


getFires();