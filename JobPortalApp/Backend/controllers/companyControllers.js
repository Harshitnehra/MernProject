import Company from "../models/company.js";

export const companyregister = async (req, res) => {
  try {
    const { companyname, description, website, location } = req.body;
    
    // Validate input fields
    if (!companyname || !description || !website || !location) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Validate userId from request (Ensure authentication middleware is working)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyname });
    if (company) {
      return res.status(400).json({ message: "A company with this name is already registered", success: false });
    }

    // Create new company
    company = await Company.create({
      name: companyname,
      description,
      website,
      location,
      userId: req.user.id, // Extracted from authenticated request
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error in company registration:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getcompany = async (req, res) => {
    try {
      const userId = req.user.id; // Fix here
  
      const companies = await Company.find({ userId });
  
      if (!companies) {
        return res
          .status(404)
          .json({ message: "No companies found", success: false });
      }
  
      return res
        .status(200)
        .json({
          message: "Companies retrieved successfully",
          companies,
          success: true,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  };
  

export const getcompanybyid = async (req, res) => {
  try {
    const companyid = req.params.id;
    const company = await Company.findById(companyid);

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // idhar cloudinary ayega

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
