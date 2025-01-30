const checkUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers; 

  if (authorization && authorization.startsWith("Bearer")) { 
    try { 
      token = authorization.split(" ")[1]; 
      const decoded = jwt.verify(token, "pleaseSubscribe");

      // Fetch user from DB
      const user = await authModel.findById(decoded.userID).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // Attach user object
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized token" }); 
    }
  } else {
    return res.status(401).json({ message: "Unauthorized token" });
  }
};

module.exports = checkUserAuthenticated;
