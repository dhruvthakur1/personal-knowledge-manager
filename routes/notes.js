const express=require("express");
const router=express.Router();
const pool=require("../db");
const { getNotes,createNotes,getNotesById,deleteNote,updateNote }=require("../controllers/notescontroller");
const { validateNote,validateId,logger }=require("../middleware/validateNote");
const { signUp,login }=require("../controllers/signup");

router.get("/notes",getNotes);

router.post("/notes",validateNote,createNotes);

router.get("/notes/:id",validateId,getNotesById);

router.delete("/notes/:id",validateId,deleteNote);

router.put("/notes/:id",validateId,updateNote);

router.post("/signup",signUp);

router.get("/login",login);

module.exports=router;
