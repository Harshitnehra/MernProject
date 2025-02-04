import Job from "../models/job.js";  // Import the Job model

export const postJob = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { title, description, requirements, salary,experiencelevle, location, jobType, position, companyId } = req.body;
    const userId = req.user.id
    // Validate that all required fields are provided
    if (!title || !description || !requirements || !salary || !experiencelevle || !location || !jobType || !position || !companyId) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }
    // Create the new job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experiencelevle,
      location,
      jobType,
      position,
      company: companyId,
      createdBy: userId,  // Using the
      //  authenticated user’s ID to track who created the job
    });

    // Return success response
    return res.status(201).json({
      message: "Job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error in creating job:", error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};


// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;

        const jobs = await Job.find({ createdBy: adminId })

        if (!jobs) {  // Use .length to check if jobs exist
            return res.status(404).json({
                message: "No jobs found for this admin.",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching admin jobs:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
