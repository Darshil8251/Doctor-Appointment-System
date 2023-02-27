const JWT=require('jsonwebtoken');

module.exports=async (req,resp,next)=>{
    try {
        const token=req.headers['http://localhost:4000/login'].split(" ")[1];
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return resp.status(500).send({
                    message:"authetication failed",
                    success:false
                })
            }
            else{
                req.body.userId=decode.id
                next();
            }
        })
        
    } catch (error) {
      console.log(error)
      resp.status(401).send({
        message:"auth failed",
        success:false
      })   
    }


}