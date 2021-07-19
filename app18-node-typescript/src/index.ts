//https://www.youtube.com/watch?v=1UcLoOD1lRM&ab_channel=BenAwad
import express from "express";
import constants from "./tsfiles/test";

const app = express();

app.get('/',(req:any,res,next)=>{
    const name = req.query.name ;
    console.log(name);
    console.log(constants.TEST);
    res.send({"hello":name});

})

app.listen(3001,()=>{
    console.log("started");
});