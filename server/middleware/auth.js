
const jwt = require('jsonwebtoken');
const auth =(req,res,next)=>{
    const user = jwt.verify(req.headers.token,SECRET);
    if (data){
    req.user = user;
    next();
    }
    res.sendStatus(403);
}