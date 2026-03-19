require("dotenv").config();
const pool=require("./db");
const express=require('express');
const app=express();
const port=3000;
const notesroute=require("./routes/notes");
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello welcome to my node server");
});
app.use("/",notesroute);

app.listen(port,()=>{
    console.log(`server listening to port ${port}`);
});