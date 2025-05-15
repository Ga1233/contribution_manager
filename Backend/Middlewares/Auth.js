// const jwt=require('jsonwebtoken')
// const ensureAuthenticated = (req, res, next) => {
//     const auth=req.headers['authorization'];
//     if(!auth){
//         return res.status(403).json({message:"Unauthorized,JWT token is required",success:false});
//     }
//     try{
//         const decoded=jwt.verify(auth,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();
//     }catch(err){
//        return res.status(403).json({message:"Unauthorized,JWT token wrong or expired"})
//     }
// }
// module.exports=ensureAuthenticated;

const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
module.exports = authMiddleware;