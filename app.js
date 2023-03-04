const express = require("express");
const cors = require('cors')
const FruitRoutes = require("./fruit-routes");
const bodyParser = require("body-parser");


var whitelist = ['http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const app = express();

const port = process.env.PORT || 1234;


const apiRoutes = express.Router();


// TODO-1: need to npm install and run to start up this fruit server


// setup the fruit routes
FruitRoutes.setup(apiRoutes);


// TODO-4: need to setup route for cart purchase
app.use(cors(corsOptions));
app.use(bodyParser.json());


// all REST api calls should be under api
app.use("/api", apiRoutes);


// basic get route for the system
app.get("/", (req, res) => {
    res.send("Welcome to fruit server 1.0.0");
});


// listening on the nodemon port configured in @see package.json
app.listen(port, (req, res) => {
    console.log(
        `fruit server started from nodemon and listening at http://localhost:${port}`
    );
});


// Custom Error handler for fruit server
app.use(function (err, req, res, next) {
    // TODO-5: handle common errors
});
