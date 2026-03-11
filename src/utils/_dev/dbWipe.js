// const mongoose = require("mongoose");
const { dbConnect, dbDisconnect } = require("../dbConnManager");

// drop the base
async function dbDrop() {
  console.log("Dropping database...")
  // await mongoose.connection.dropDatabase();
  console.log("Database is dropped")
}

dbConnect().then(async () => {
  await dbDrop();
  await dbDisconnect();
});
