const Currency = require("../models/currencyModel");
const asyncHandler = require("express-async-handler");

// Display All  currency Data
const LIMIT = 10;
const currency_index =  asyncHandler(async (req, res) => {
    try {
        const { page = 1 } = req.query;

        const currencyData = await Currency.find().limit(LIMIT).skip((page - 1) * LIMIT).sort({
            createdAt: -1,
        })
        return res.status(200).send({"currencyData":currencyData,
        "currenPage" : Number(page)});
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Create New currency data
const currency_create_post = asyncHandler(async (req, res) => {
    try {
        const currencyData = req.body;
        if (Object.keys(currencyData).length == 0) {
            return res.status(400).send({ message: "Currency Is not Provided" });
		}
        const newCurrency = await Currency.create({
            added_by:currencyData.added_by,
			category_Name:currencyData.category_Name,
            code: currencyData.code,
            Symbol,
            thousand_separator,
            decimal_separator,
            exchange_rate,

        });
        newCurrency.save()
        res
            .status(200)
            .send({newCategory, message: "Currency Created Succesfully !" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
    }
});
//get category data for creator
const getdataForCreator =  asyncHandler(async (req, res) => {
    try {

        const currecnyData = await Currency.find({user:req.user}).sort({
            createdAt: -1,
        })
        return res.status(200).send(currecnyData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});
//get single category
const getsingledata =  asyncHandler(async (req, res) => {
    try {
        const currecnyData = await Currency.findById(req.params.id)
        if (currecnyData == null) {
            return res.status(404).send({ message: "Requested Data not found" });
        }

        return res.status(200).send(currecnyData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

// Update currency Detail by Id
const currency_update = asyncHandler(async (req, res) => {
    try {
        const currencyData = req.body;
        const categoryid = req.params.id;
        if (!categoryid) {
            return res.status(400).send({ message: "Requested Id Is not Found" });
        }
        if (Object.keys(categoryData).length == 0) {
            return res.status(400).send({ message: "currency  Data Is not Provided" });
        }

        const updatedcurrency = await  Currency.findOneAndUpdate({
            added_by:currencyData.added_by,
			category_Name:currencyData.category_Name,
            code: currencyData.code,
            Symbol,
            thousand_separator,
            decimal_separator,
            exchange_rate,
            });
            
            updatedcurrency.save()
            res
            .status(200)
            .send({ updatedcategory, message: "Selected category Updated Succesfully !" });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});
// Delete CRUD Detail by Id
const currency_delete = asyncHandler(async (req, res) => {
    try {
        const currencyToDelete = await Currency.findById(req.params.id);

        if(currencyToDelete == null){
            return res.status(404).send({ message: "currency data Not found" });
        }
        const deletedcurrency = await Currency.deleteOne({_id:req.params.id});

        return res
            .status(202)
            .send({ deletedcurrency, message: "Selected Category Data Deleted Succesfully !" });
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
});

module.exports = {
	currency_index,
	currency_create_post,
	currency_update,
	currency_delete,
	getdataForCreator,
	getsingledata,
};
