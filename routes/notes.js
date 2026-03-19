const express=require("express");
const router=express.Router();
const pool=require("../db");
const { getNotes,createNotes,getNotesById,deleteNote,updateNote }=require("../controllers/notescontroller");
router.get("/notes",getNotes);

router.post("/notes",createNotes);

router.get("/notes/:id",getNotesById);

router.delete("/notes/:id",deleteNote);

router.put("/notes/:id",updateNote);


module.exports=router;
