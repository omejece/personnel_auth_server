require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const moduleLoader = require("./moduleLoader");


const corsOptions = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers" : ["Content-Type","Authorization"]
};

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true,limit: '100mb'}));
app.use(cors(corsOptions));




moduleLoader.loadRoutes().then(Routers=>{
     moduleLoader.loadControllers().then(Controllers=>{
            app.use('/auth',Controllers.auth.verify,Routers.auth);
            app.use('/personnel',Controllers.auth.verify,Routers.personnels);
            app.use('/user',Routers.users);
     }).catch(err=>{
         console.log(err);
     });
}).catch(err=>{
    console.log(err);
});




app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Something broke!');
});


const server = http.createServer(app);

server.listen(7000,()=>{
     console.log(`server listening at port ${process.env.SEEVER_API_PORT}  at ip of ${process.env.SEEVER_API_SERVER}` );
});


