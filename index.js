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


const server = http.createServer(app);

server.listen(7000,()=>{
     
     console.log(`server listening at port ${process.env.SEEVER_API_PORT}  at ip of ${process.env.SEEVER_API_SERVER}` );
});


