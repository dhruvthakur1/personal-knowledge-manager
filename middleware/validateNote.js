const validateNote=(req,res,next)=>{if(!req.body.title || !req.body.content){
        return res.status(400).json({
            message:"values not specified"
        })
    }
    next();
}
const validateId=(req,res,next)=>{
    let ids=req.params.id;
    ids=Number(ids);
    if(isNaN(ids)){
        return res.status(400).json({
            message:"wrong id specified, bad manners"
        })
    }
    next();
}
const logger=(req,res,next)=>{
    console.log(req.method,req.url);
    next();
}
module.exports={ validateNote,validateId,logger };