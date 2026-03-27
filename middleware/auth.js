const jwt=require("jsonwebtoken");


const auth=(req,res,next)=>{
    try{
    const header=req.headers.authorization;
    const jwtSecretKey=process.env.JWT_SECRET;
    if(!header){
        return res.status(401).json({Message:"no token sent"});
    }
    const token=header.replace("Bearer ","");
    try{
        const verified=jwt.verify(token,jwtSecretKey);
        req.user=verified.userid;
        next();
    }
    catch(err){
        return res.status(400).json({message:"Invalid token"});
    }
}
catch(err){
    next(err);
}
}
module.exports={auth};