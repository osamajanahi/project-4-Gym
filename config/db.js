require('dotenv').config()
const mongoose = require('mongoose')
const mongodbURI = process.env.MONGO_DB_URI
mongoose.connect(mongodbURI)
.then(() => console.log(`Connected to MongoDB database named: ${mongoose.connection.name}!!!`))
.catch((error) => console.error("Error: MongoDB is not connected. " + error.message));
