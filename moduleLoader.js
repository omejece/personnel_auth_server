
const appConfig = require("./config/appConfig");
const path = require("path");
const fs = require("fs");
module.exports = {
    loadRoutes: async()=>{
        var featureDirectories = [];
        var routeFiles = {};
        fs.readdirSync(path.join(__dirname,"features")).forEach(dir=>{
            featureDirectories.push(dir);
        });
        
        await featureDirectories.forEach(async (x)=>{
            const myFile = await require(path.join(__dirname,"features",x,"routes"));
            routeFiles[x] = myFile;
        });

        return new Promise((resolve,reject)=>{
              resolve(routeFiles);
        });
    },
    loadControllers: async()=>{
        var featureDirectories = [];
        var controllerFiles = {};
        fs.readdirSync(path.join(__dirname,"features")).forEach(dir=>{
            featureDirectories.push(dir);
        });
        
        await featureDirectories.forEach(async (x)=>{
            const myFile = await require(path.join(__dirname,"features",x,"controller"));
            controllerFiles[x] = myFile;
        })

        return new Promise((resolve,reject)=>{
            resolve(controllerFiles);
        });
    }
}