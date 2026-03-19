require("dotenv").config();
const pool=require("./db");
const express=require('express');
const app=express();
const port=3000;
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello welcome to my node server");
});

app.get("/notes",async (req,res)=>{
    const data=await pool.query("SELECT * FROM NOTES");
    res.json(data.rows);
})
app.post("/notes",async (req,res)=>{
    if(!req.body.title || !req.body.content){
        return res.status(400).json({
            message:"values not specified"
        })
    }
    const data=await pool.query("INSERT INTO NOTES (title,content) VALUES ($1,$2) RETURNING *",[req.body.title,req.body.content]);
    res.json(data.rows[0]);
})

app.get("/notes/:id",async (req,res)=>{
    let ids=req.params.id;
    if(!Number(ids)){
        return res.status(400).json({
            message:"wrong id specified, bad manners"
        })
    }
    ids=Number(ids);
    const result=await pool.query("SELECT * FROM NOTES WHERE ID=$1",[ids]);
    if(result.rows.length===0){
        return res.status(404).json({
            message:"invalid id"
        })
    }
    res.json(result.rows);
})

app.delete("/notes/:id",async (req,res)=>{
    let ids=req.params.id;
    ids=Number(ids);
    if(!ids){
        return res.status(400).json({
            message:"invalid id"
        })
    }
    const result=await pool.query("DELETE FROM NOTES WHERE ID=$1 RETURNING *",[ids]);
    if(result.rows.length===0){
        return res.status(404).json({
            message:"no related id's found"
        })
    }
    res.json({
        message:"successfully deleted",
        deleted:result.rows[0]
    })
})

app.put("/notes/:id",async (req,res)=>{
    let ids=req.params.id;
    ids=Number(ids);
    if(!ids){
        return res.status(400).json({
            message:"Invalid id"
        })
    }
    if(req.body.title){
        await pool.query("UPDATE NOTES SET title=$1 WHERE ID=$2",[req.body.title,ids]);
    }
    if(req.body.content){
        await pool.query("UPDATE NOTES SET content=$1 WHERE ID=$2",[req.body.content,ids]);
    }
    const result=await pool.query("SELECT * FROM NOTES WHERE ID=$1",[ids]);
    if(result.rows.length===0){
        return res.status(404).json({
            message:"no id found"
        })
    }
    res.json({
        message:"successfully changed",
        updatednote:result.rows
    })
})
app.listen(port,()=>{
    console.log(`server listening to port ${port}`);
});