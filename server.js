const myDB = require("./db/mySQLiteDB.js");



async function main() {
  const fires = await myDB.getFires();

  console.log(`got ${fires.length} fires`);
}

main();