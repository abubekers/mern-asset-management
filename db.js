require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
	const connection = mongoose
		.connect(process.env.MONGO_REMOTE)
		try {
			if(connection)
			{
			  console.log("Mongodb Connection successed!")
			}
		} catch (error) {
			console.log("could not connect to database")
		}
};
