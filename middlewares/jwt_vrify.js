const jwt=require('jsonwebtoken');
const jwtkey="dde2a7ab1501ece90794ccdc6e2db7744b1a6425dea17fe2697510f3232ce41f";
const verify=(req,res,next)=>
{
    
    const authheader=req.headers['authorization'];
    if(!authheader)
    {
        return res.status(401).json({error:"auth header is required"});
    }
    console.log({"my headers":authheader});
    const token=authheader.split(" ")[1];
    try
    {
        const decode=jwt.verify(token,jwtkey);
        console.log({"decoded token":decode});
        next();
    }
    catch(err)
    {
        return res.status(401).json({error:"invalid token"});
    }
   
    
   
}
module.exports=verify;