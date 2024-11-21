
const appConfig = require("../../config/appConfig");
const uniqid = require("uniqid");
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const User = require("../../models").User;
const Personnel = require("../../models").Personnel;


const login = async (req,res,next)=>{
     try{
        const result = await User.findOne({where:{email:"omejece@gmail.com"}});
        console.log(result)
        if(result){
           const isPasswdMatch = bcrypt.compare(req.body.password,result.password);
           console.log(isPasswdMatch)
           console.log(result.password)
           if(isPasswdMatch){
                const user = {
                    fName: result.fName,
                    lName: result.lName,
                    email: result.email,
                    phone: result.phone,
                    image: result.image
                };
                const token = jwt.sign(user,appConfig.jwt_secret,{expiresIn: "600h"});
                res.status(200).send({user:user,token:token});
           } 
           else{
               throw {status:401,message:"invalid username or password"};
           }
        }
        else{
            throw {status:401,message:"invalid username or password"};
        }
     }
     catch(err){
        console.log(err);
        console.log(err.statusCode);
        let error = {status: 500, message:"server error"};
        error.status = err?.statusCode ? err?.statusCode : error.status;
        error.message = err?.message ? err?.message : error.message;
        res.status(error.status).send(error);
     }
     
}



const initialize = async (req,res,next)=>{
    try{
        const result = await User.findAll();
        if(result.length <= 0){
            console.log(result);
            const newUser1 = new User({
                fName: "Omeje",
                lName: "Ejike",
                email: "omejece@gmail.com",
                password: await bcrypt.hash("cceeoo33",10),
                phone: "07031368418",
                image: "",
                rememberToken: uniqid()
            });


            const newUser2 = new Personnel({
                fName: "Okoro",
                mName: "Abdulahi",
                lName: "Adewale",
                core: "Signal",
                armyNumber: "NA-15-S345",
                rank: "Major",
                email: "okoro@gmail.com",
                password: await bcrypt.hash("cceeoo33",10),
                phone: "894940404040",
                image: "",
                rememberToken: uniqid()
            });

            newUser1.save();
            newUser2.save();
            res.status(200).send({success: true, message:"successfully added 1"});
        }
        else{
            res.status(200).send({success: true, message:"successfully initialized"});
        }

    }
    catch(err){
        console.log(err);
        let error = {status: 500, message:"server error"};
        error.status = err?.status ? err?.status : error.status;
        error.message = err?.message ? err?.message : error.message;
        res.status(error.status).send(error);
    }
}


const verify  = async (req,res,next)=>{
    try{
        let headerArr;
        let headerAuth = req.headers["authorization"];
        
        if(headerAuth){
                 headerArr = headerAuth.split(" ");
                if(headerArr[0] === "Bearer"){
                    const token = headerArr[1];
                    if(token){
                        console.log(token);
                        console.log(appConfig.jwt_secret);
                        const decoded = await jwt.verify(token,appConfig.jwt_secret);
                        if(decoded){
                                req.auth = decoded;
                                next();
                        }
                        else{
                            throw {status: 403, message:"invalid token"};
                        }
                    }
                    else{
                        throw {status: 401, message:"invalid token"};
                    }
            }
            else{
                throw {status: 401, message:"invalid token"};
            }
        }
        else{
            throw {status: 403, message:"invalid token"};
        }
        
    }
    catch(err){
        console.log(err);
        let error = {status: 500, message:"server error"};
        error.status = err?.status ? err?.status : error.status;
        error.message = err?.message ? err?.message : error.message;
        res.status(error.status).send(error);
    }
} 




module.exports = {
    login,
    initialize,
    verify
}