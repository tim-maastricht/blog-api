// Connecting and disconnecting from the database 
const mongoose = require("mongoose");
const { loadEnvFile } = require("node:process");

loadEnvFile();

// connect function 
async function dbConnect(){
	let dbUrl = process.env.DATABASE_URL;
	console.log(dbUrl);
  console.log("Connected")

	// workaround is to modify expected dns servers
	require('node:dns').setServers(['8.8.8.8', '1.1.1.1']);

	await mongoose.connect(dbUrl);
}

// disconnect function 
async function dbDisconnect(){
	await mongoose.disconnect();
}

module.exports = {
	dbConnect, dbDisconnect
}
