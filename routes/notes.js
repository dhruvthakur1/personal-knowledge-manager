const express=require("express");
const router=express.Router();
const pool=require("../db");
const { getNotes,createNotes,getNotesById,deleteNote,updateNote }=require("../controllers/notescontroller");
const { validateNote,validateId,logger }=require("../middleware/validateNote");
const { signUp,login }=require("../controllers/signup");
const {auth}=require("../middleware/auth");

router.get("/notes",auth,getNotes);

router.post("/notes",validateNote,auth,createNotes);

router.get("/notes/:id",validateId,auth,getNotesById);

router.delete("/notes/:id",validateId,auth,deleteNote);

router.put("/notes/:id",validateId,auth,updateNote);

router.post("/signup",signUp);

router.get("/login",login);

module.exports=router;
