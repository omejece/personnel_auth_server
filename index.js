require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const authRoute = require('./features/auth/routes');
const personnelRoute = require('./features/personnels/routes');
const userRoute = require('./features/users/routes');
const authController = require("./features/auth/controller");
const https = require('https');
const fs = require('fs');



const options = {
    key: fs.readFileSync('../../ssl/keys/b8250_7dccd_5da064ca7bc584cf1eb9173bf7fdb6cd.key'), // Private key
    cert: fs.readFileSync('../../ssl/certs/meteradmin_buywater_store_b8250_7dccd_1739750025_7fac1937156077828d68994ae6365952.crt'), // Certificate
};

const corsOptions = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers" : ["Content-Type","Authorization"]
};

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors(corsOptions));

app.use('/auth',authRoute);
app.use('/personnel',authController.verify,personnelRoute);
app.use('/user',userRoute);




app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Something broke!');
});


const server2 = https.createServer(options, app);

const server = http.createServer(app);


server2.listen(7000,()=>{
    console.log(`server listening at port ${process.env.SEEVER_API_PORT}  at ip of ${process.env.SEEVER_API_SERVER}` );
});

server.listen(8000,()=>{
     console.log(`server listening at port ${process.env.SEEVER_API_PORT}  at ip of ${process.env.SEEVER_API_SERVER}` );
});


