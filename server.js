// server.js
// Require dependencies
const express = require('express');
const expressLayout = require('express-ejs-layouts');
require('dotenv').config()

// connect to mongoDB
require('./config/db')

// initialize express app
const app = express();

// get the port number form .env file, if undefined, 3000
const port = process.env.PORT || 3000


//  Middlewares
// Templating Engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// to encode req.body - make form data readable in controllers
app.use(express.urlencoded({ extended: true }));

// link you static folder i.e. images, css 
app.use(express.static('public'));
//-------------------------//

const userRouter = require("./routes/user");
const classRouter = require('./routes/class');
const receiptRouter = require('./routes/receipt');
const categoryRouter = require('./routes/category');
const facilitiesRouter = require('./routes/facilities');
//------- Mount routes -------//
// Your code goes here

app.use("/user", userRouter);
app.use("/class", classRouter);
app.use("/receipt", receiptRouter);
app.use("/category", categoryRouter);
app.use("/facilities", facilitiesRouter);


//-------------------------//

// start listening to requests coming from the PORT
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
