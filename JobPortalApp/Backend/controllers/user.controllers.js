import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "all field are requried", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "all field are requried", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password.", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect email or password.", success: false });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "Incorrect role selected", success: false });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server error: JWT_SECRET not set" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    user = {
        _id : user._id,
        fullname : user.fullname,
        email: user.email,
        phonenumber : user.phone,
        role : user.role,
        profile: user.profile
    }
    return res.status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Login successful ${user.fullname}`, success: true , user, token});

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// logout user 

export const logout = async (req, res) => {
    try {
      return res.status(200)
        .cookie("token", "", {
          maxAge: 0,
          httpOnly: true,
          sameSite: "strict",
        })
        .json({ message: "Logout successful", success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// update user 

export const updateProfile = async (req, res) => {
    try {
      const { fullname, email, phone, bio, skills } = req.body;
      const file = req.file ;
    //   cloudinary ayega 
    let skillsArray;
    if(skills){
        skillsArray = skills.split(",");
    }

      const userID = req.user.id;  // middleware authentication
  
      let user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }
  
      // Update user data
      if(fullname) user.fullname = fullname;
      if(email) user.email = email;
      if(phone) user.phone = phone;
      if(bio) user.profile.bio = bio;
      if(skills) user.profile.skills = skillsArray;
//    resuma come later
      await user.save();

      user = {
        _id : user._id,
        fullname : user.fullname,
        email: user.email,
        phonenumber : user.phone,
        role : user.role,
        profile: user.profile
    }
  
      return res.status(200).json({ message: "Profile updated successfully", success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  