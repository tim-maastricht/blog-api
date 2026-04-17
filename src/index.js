// Import the server from server.js
const {app} = require("./server.js");

// Load up environment variables 
const {loadEnvFile} = require("node:process");


// TODO cleanup
try {
    loadEnvFile();
} catch (error) {
    console.log("No .env file detected!")
    if (process.env.NODE_ENV == "production"){
        console.log("No .env file - this is intentional!");
    }
}

// Connect to the database 
const { dbConnect } = require("./utils/dbConnManager");
dbConnect().then(() => {

	// Run the server
	app.listen(process.env.PORT || 3000, () => {
		console.log("Server is running on http://localhost:3000/");
	});

});
