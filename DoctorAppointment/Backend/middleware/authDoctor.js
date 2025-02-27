import jwt from "jsonwebtoken";

export const authDoctor = (req, res, next) => {
  try {
    const {dtoken} = req.headers
    if(!dtoken){
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    // Check if admin credentials are correct
    // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    //   return res.status(403).json({ success: false, message: "Token is not valid." });
    // }
    req.body.docId = token_decode.Id;
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token." });
  }
};
