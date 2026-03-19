const express=require("express");
const router=express.Router();
const pool=require("../db");
router.get("/notes",async (req,res)=>{
    const data=await pool.query("SELECT * FROM NOTES");
    res.json(data.rows);
})
router.post("/notes",async (req,res)=>{
    if(!req.body.title || !req.body.content){
        return res.status(400).json({
            message:"values not specified"
        })
    }
    const data=await pool.query("INSERT INTO NOTES (title,content) VALUES ($1,$2) RETURNING *",[req.body.title,req.body.content]);
    res.json(data.rows[0]);
})
module.exports=router;