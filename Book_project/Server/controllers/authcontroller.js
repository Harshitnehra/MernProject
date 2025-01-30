const authmodel = require("../models/authModle");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authmodel.findOne({ email: email });
        if (!isUser) {
          // Password hashing
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);

          // Save user
          const newUser = new authmodel({
            username,
            email,
            password: hashedPassword,
          });
          const response = await newUser.save();
          res.status(200).json({ message: "User created successfully", response });
        } else {
          return res.status(400).json({ message: "Email already registered" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static userLogin = async (req, res) => {
    const {email, password } = req.body;
    try {
        if(email && password){
            const isemail = await authmodel.findOne({ email: email });
            if(isemail){
                if(isemail.email === email && (await bcryptjs.compare(password , isemail.password))){
                    // generated token
                    const token = jwt.sign({ userID: isemail._id }, "pleaseSubscribe", { expiresIn: "1d" });
                    res.status(200).json({ message: "Login successful", token, name: isemail.username });
                }else{
                    return res.status(400).json({ message: "worong data" });
                }
            }else{
                return res.status(400).json({ message: "Email id is not found" });
            }
        }
        else{
            return res.status(400).json({ message: "All fields are required" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = AuthController;
