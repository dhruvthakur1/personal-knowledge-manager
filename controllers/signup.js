const pool=require("../db");
const bycrypt=require("bcrypt");

const signUp=async (req,res,next)=>{
    try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    if(!name || !email || !password){
        return res.status(400).json({message:"missing values"});
    }
    const result=await pool.query("SELECT * FROM users WHERE EMAIL=$1",[email]);
    if(result.rows!=0){
        return res.status(400).json({message:"This email is already used"});
    }
    if(password.length<8){
        return res.status(400).json({message:"weak password"});
    }
    const saltRound=10;
    const hashingPassword=await bycrypt.hash(password,saltRound);
    const sign=await pool.query("INSERT INTO users (name,email,password_hash,created_at) VALUES ($1,$2,$3,$4) RETURNING *",[name,email,hashingPassword,new Date()]);
    res.json({message:"sign up successful",detail:{name:sign.rows[0].name,email:sign.rows[0].email}});
}
catch(err){
    next(err);
}
}
module.exports={signUp};