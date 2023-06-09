const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

// Display All  category Data
const LIMIT = 10;
category_index =  asyncHandler(async (req, res) => {
    try {
        const { page = 1 } = req.query;

        const categoryData = await Category.find().limit(LIMIT).skip((page - 1) * LIMIT).sort({
            createdAt: -1,
        })
        return res.status(200).send({"categoryData":categoryData,
        "currenPage" : Number(page)});
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Create New category data
category_create_post = asyncHandler(async (req, res) => {
    try {
        const categoryData = req.body;
        if (Object.keys(categoryData).length == 0) {
            return res.status(400).send({ message: "Category Is not Provided" });
		}
        const newCategory = await Category.create({
            category_Code:categoryData.category_Code,
			category_Name:categoryData.category_Name,
            added_by: categoryData.added_by

        });
        newCategory.save()
        res
            .status(200)
            .send({newCategory, message: "Congrants! New Category Created Succesfully !" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
    }
});
//get category data for creator
getdataForCreator =  asyncHandler(async (req, res) => {
    try {

        const categoryData = await Category.find({user:req.user}).sort({
            createdAt: -1,
        })
        return res.status(200).send(categoryData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});
//get single category
getsingledata =  asyncHandler(async (req, res) => {
    try {
        const categoryData = await Category.findById(req.params.id)
        if (categoryData == null) {
            return res.status(404).send({ message: "Requested Data not found" });
        }

        return res.status(200).send(categoryData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Update catwegory Detail by Id
category_update = asyncHandler(async (req, res) => {
    try {
        const categoryData = req.body;
        const categoryid = req.params.id;
        if (!categoryid) {
            return res.status(400).send({ message: "Requested Id Is not Found" });
        }
        if (Object.keys(categoryData).length == 0) {
            return res.status(400).send({ message: "Category Data Is not Provided" });
        }

        const updatedcategory = await  Category.findOneAndUpdate({
            category_Code:categoryData.category_Code,
			category_Name:categoryData.category_Name,
            added_by: categoryData.added_by
            });
            
            updatedcategory.save()
            res
            .status(200)
            .send({ updatedcategory, message: "Selected category Updated Succesfully !" });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});
// Delete CRUD Detail by Id
category_delete = asyncHandler(async (req, res) => {
    try {
        const categoryToDelete = await Category.findById(req.params.id);

        if(categoryToDelete == null){
            return res.status(404).send({ message: "Category data Not found" });
        }
        const deletedcategory = await Category.deleteOne({_id:req.params.id});

        return res
            .status(202)
            .send({ deletedcategory, message: "Selected Category Data Deleted Succesfully !" });
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
});

module.exports = {
	category_index,
	category_create_post,
	category_update,
	category_delete,
	getdataForCreator,
	getsingledata,
};
