const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	added_by: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	  },
	  category_Code:{
		type: String,
		required: [true, "Category Code is required"],
		unique: [true, "Category code Already Exists"],
	},
	category_Name: {
		type: String,
		required: [true, "category name required"],
		min: [12, "min is 12"],
		max: [12, "max is 12"],
	},
},
{  
     timestamps: true
}
);

module.exports = mongoose.model("Category", categorySchema, "Category");
