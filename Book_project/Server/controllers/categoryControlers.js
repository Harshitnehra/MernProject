const categorieModle = require("../models/CetegoryModle")
class categoryControllers{
    static getallcategory = async (req, res) => {
        try {
          const fetchAllCategory = await categorieModle.find({}); // Return an array
          return res.status(200).json({ fetchAllCategory }); 
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
      
    static addnewcategory = async (req , res) =>{
        const {title} = req.body;
       try {
        if(title){
            const newCategory = new categorieModle({title})
            const savecategory = await newCategory.save();
            if(savecategory){
                return res.status(200).json({ message: "category add seccesful" , savecategory});
            }
        }else{
            return res.status(500).json({ message: "all field requride" });
        }
       } catch (error) {
         return res.status(500).json({ message: error.message });
       }
    }
    }
    
    module.exports = categoryControllers;