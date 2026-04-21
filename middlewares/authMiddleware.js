const jwt = require(`jsonwebtoken`);

const authMiddleware = (req,res,next)=>{
    try{
        //basically if u remember when we send routes with data  from frntend tobackend we send headers 
        // which has authorization and content-typ so below we r extracting authorization only 
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){ //if user does not give token then will not be able to move ahead
            return res.status(401).json({message:"Token is invalid"});
        }
        req.user = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch(error){
        res.status(400).json({message:"Invalid token"});
    }
};

module.exports = authMiddleware;