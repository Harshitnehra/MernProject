import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const {token} = req.headers
    if(!token){
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // Check if admin credentials are correct
    // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    //   return res.status(403).json({ success: false, message: "Token is not valid." });
    // }
    req.body.userId = token_decode.id;
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token." });
  }
};
