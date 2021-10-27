const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

sqlite3.verbose();

async function connect() {
  return open({
    filename: "./db/fires.db",
    driver: sqlite3.Database,
  });
}

async function getFires() {
  const db = await connect();

  return await db.all("SELECT * FROM Fires ORDER BY fireId DESC LIMIT 20");
}

async function createFire(newFire) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    Fires(location, startDate, endDate, size)
    VALUES (:location, :startDate, :endDate, :size)
  `);

  stmt.bind({
    ":location": newFire.location,
    ":startDate": newFire.startDate,
    ":endDate": newFire.endDate,
    ":size": newFire.size,
  });

  return await stmt.run();
}

async function getFireByID(fireID) {
  const db = await connect();

  const stmt = await db.prepare(`SELECT *
    FROM Fires
    WHERE
      fireID = :fireID
  `);

  stmt.bind({
    ":fireID": fireID,
  });

  return await stmt.get();
}

async function deleteFire(fireToDelete) {
  const db = await connect();

  const stmt = await db.prepare(`DELETE FROM
    Fires
    WHERE fireID = :theIDToDelete
  `);

  stmt.bind({
    ":theIDToDelete": fireToDelete.fireID,
  });

  return await stmt.run();
}
module.exports.getFires = getFires;
module.exports.createFire = createFire;
module.exports.deleteFire = deleteFire;
module.exports.getFireByID = getFireByID;
