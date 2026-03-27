const pool=require("../db");

const getNotes=async (req,res,next)=>{
    try{
    const userid=req.user;
    const data=await pool.query("SELECT * FROM NOTES WHERE user_id=$1",[userid]);
    res.json(data.rows);
    }
    catch(err){
        next(err);
    }
}
const createNotes=async (req,res,next)=>{
    try{
    const data=await pool.query("INSERT INTO NOTES (title,content,user_id) VALUES ($1,$2,$3) RETURNING *",[req.body.title,req.body.content,req.user]);
    res.json(data.rows[0]);
    }
    catch(err){
        next(err);
    }
}

const getNotesById=async (req,res,next)=>{
    try{
    let ids=req.params.id;
    ids=Number(ids);
    const result=await pool.query("SELECT * FROM NOTES WHERE ID=$1 AND user_id=$2",[ids,req.user]);
    if(result.rows.length===0){
        return res.status(404).json({
            message:"invalid id"
        })
    }
    res.json(result.rows);
}
    catch(err){
        next(err);
    }
}

const deleteNote=async (req,res,next)=>{
    try{
    let ids=req.params.id;
    ids=Number(ids);
    const result=await pool.query("DELETE FROM NOTES WHERE ID=$1 AND user_id=$2 RETURNING *",[ids,req.user]);
    if(result.rows.length===0){
        return res.status(404).json({
            message:"no related id's found"
        })
    }
    res.json({
        message:"successfully deleted",
        deleted:result.rows[0]
    })
}
    catch(err){
        next(err);
    }
}

const updateNote=async (req,res,next)=>{
    try{
    let ids=req.params.id;
    let user=req.user;
    ids=Number(ids);
    if(req.body.title){
        await pool.query("UPDATE NOTES SET title=$1 WHERE ID=$2 AND user_id=$3",[req.body.title,ids,user]);
    }
    if(req.body.content){
        await pool.query("UPDATE NOTES SET content=$1 WHERE ID=$2 AND user_id=$3",[req.body.content,ids,user]);
    }
    const result=await pool.query("SELECT * FROM NOTES WHERE ID=$1 AND user_id=$2",[ids,user]);
    if(result.rows.length===0){
        return res.status(404).json({
            message:"no id found"
        })
    }
    res.json({
        message:"successfully changed",
        updatednote:result.rows
    })
}
    catch(err){
        next(err);
    }
}
module.exports={ getNotes,createNotes,getNotesById,deleteNote,updateNote };