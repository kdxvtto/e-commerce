const jsonwebtoken = require('jsonwebtoken')

const verifyToken = async (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]
    try {
        if(!token){
            return res.status(401).json({ 
                sucess : false,
                message: 'Unauthorized' 
            });
        }
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ 
            sucess : false,
            message: error.message 
        });
    }
}

module.exports = verifyToken