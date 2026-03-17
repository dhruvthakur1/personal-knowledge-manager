const express=require('express');
const app=express();
const port=3000;
const { Pool }=require("pg");
let notes=[];
let idcount=0;
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello welcome to my node server");
});

app.get("/notes",(req,res)=>{
    res.json(notes);
})
app.post("/notes",(req,res)=>{
    if(!req.body.title || !req.body.content){
        res.status(400).json({
            message:"values not specified"
        })
    }
    let newNote={
        id:idcount++,
        title:req.body.title,
        content:req.body.content,
        tags:req.body.tags
    }
    notes.push(newNote);
    res.json(newNote);
})

app.get("/notes/:id",(req,res)=>{
    let ids=req.params.id;
    if(!Number(ids)){
        res.status(400).json({
            message:"wrong id specified, bad manners"
        })
    }
    ids=Number(ids);
    let obj=notes.find(o=>o.id===ids);
    if(!obj){
        res.status(404).json({
            message:"no note found!"
        });
    }
    res.json(obj);
})

app.delete("/notes/:id",(req,res)=>{
    let ids=req.params.id;
    ids=Number(ids);
    if(!ids){
        res.status(400).json({
            message:"invalid id"
        })
    }
    let obj=notes.find(o=>o.id===ids);
    if(!obj){
        res.status(404).json({
            message:"No note found!"
        })
    }
    notes=notes.filter(o=>o.id===!ids);
    res.json({
        message:"successfully deleted",
        deletednotes:obj
    })
})
app.listen(port,()=>{
    console.log(`server listening to port ${port}`);
});