require("dotenv").config();
const pool=require("./db");
const express=require('express');
const app=express();
const port=3000;
const notesroute=require("./routes/notes");
const { logger } = require("./middleware/validateNote");
app.use(express.json());
app.use(logger);
app.use((err,req,res,next)=>{
    console.log(err.message);
    res.status(500).json({message:"server error"});
})
app.get("/",(req,res)=>{
    res.send("hello welcome to my node server");
});
app.use("/",notesroute);

app.listen(port,()=>{
    console.log(`server listening to port ${port}`);
});