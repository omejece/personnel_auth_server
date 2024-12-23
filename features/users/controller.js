
const appConfig = require("../../config/appConfig");
const User = require("../../models").User;
const uniqid = require("uniqid");
const bcrypt = require('bcrypt-nodejs');

async function create(req,res,next){
    try{
        const salt = bcrypt.genSaltSync(10);
        let result = await User.findOne({where:{email:req.body.email}});
        if(!result){
            const newUser = User({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password,salt),
                phone: req.body.phone,
                image: req?.body?.image,
                rememberToken: uniqid()
            });
            await newUser.save();
            res.status(200).send({success: true, message:"user added successfully"});
        }
        else{
            throw {status: 409, message:"user with this email already exist "};
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


async function update(req,res,next){
    try{
        let result = await User.findOne({where:{id:req.params.id}});
        if(result){
            await User.update(
                {
                    fName: req.body.fName,
                    lName: req.body.lName,
                    email: req.body.email,
                    phone: req.body.phone,
                    image: req?.body?.image ? req?.body?.image : result.image,
                    rememberToken: uniqid()
                },
                {
                    where:{
                        id: req.params.id
                    }
                }
            );
            res.status(200).send({success: true, message:"user successfully updated"});
        }
        else{
            throw {status: 404, message:"user does not exist"}
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








async function remove(req,res,next){
    try{
        let result = await User.findByPk(req.params.id);
        if(result){
            await result.destroy();
            res.status(200).send({success: true, message:"user successfully deleted"});
        }
        else{
            throw  {status: 401, message:"device does not exist"}
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

async function read(req,res,next){
    try{
        let result = await User.findByPk(req.params.id);
        if(result){
            res.status(200).send(result);
        }
        else{
            throw {status: 404, message:"user does not exist"}
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

async function readAll(req,res,next){
    try{
        let result = await User.findAll();
        res.status(200).send(result);
    }
    catch(err){
        console.log(err);
        let error = {status: 500, message:"server error"};
        error.status = err?.status ? err?.status : error.status;
        error.message = err?.message ? err?.message : error.message;
        res.status(error.status).send(error);
    }
}


async function changePassword(req,res,next){
    try{
        let result = await User.findByPk(req.auth.id);
        if(result){
            await User.update(
                {
                   password: await bcrypt.hash(req.body.password,10),
                   rememberToken: uniqid()
                },
                {
                    where:{
                        id: req.auth.id
                    }
                }
            );
            res.status(200).send({success: true, message:"password successfully updated"});
        }
        else{
            throw {status: 404, message:"user does not exist"}
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






async function changeImage(req,res,next){
    try{
        let result = await User.findByPk(req.auth.id);
        if(result){
            await User.update(
                {
                   password: await bcrypt.hash(req.body.password,10),
                   rememberToken: uniqid()
                },
                {
                    where:{
                        id: req.auth.id
                    }
                }
            );
            res.status(200).send({success: true, message:"user successfully updated"});
        }
        else{
            throw {status: 404, message:"user does not exist"}
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


async function passwordResetRequest(req,res,next){
    try{
        let result = await User.findOne({where:{email:req.body.email}});
        if(result){
            // generate a random number
            const randomNo = "";
            await User.update(
                {
                    rememberToken: randomNo
                },
                {
                    where:{
                        email: req.body.email
                    }
                }
            );
            // send email
            res.status(200).send({success: true, message:"token sent successfully"});
        }
        else{
            throw {status: 404, message:"user does not exist"}
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



async function resetPassword(req,res,next){
    try{
        let result = await User.findOne({where:{email:req.body.email,rememberToken: req.params.token}});
        if(result){
            await User.update(
                {
                    password: await bcrypt.hash(req.body.password,10),
                    rememberToken: uniqid()
                },
                {
                    where:{
                        email:req.body.email
                    }
                }
            );
            res.status(200).send({success: true, message:"password successfully updated"});
        }
        else{
            throw {status: 404, message:"invalid token"}
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
    create,
    update,
    remove,
    read,
    readAll,
    changePassword,
    changeImage,
    passwordResetRequest,
    resetPassword
}