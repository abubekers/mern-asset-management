const asyncHandler = require("express-async-handler");
// const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
// Get all customer
LIMIT = 10;
const customer_index =  asyncHandler(async (req, res) => {
  try {
      const { page = 1 } = req.query;

      const customer = await Customer.find().limit(LIMIT).skip((page - 1) * LIMIT).sort({
          createdAt: -1,
      })
      return res.status(200).send({"customer":customer,
      "currenPage" : Number(page)});
  } catch (error) {
      return res.status(400).send({ message: error.message });
  }
});
//Create Customer
const customer_create = asyncHandler(async (req, res) => {
  try {
      const customer = req.body;
      if (Object.keys(customer).length == 0) {
          return res.status(400).send({ message: "Customer Is not Provided" });
  }
      const newCustomer = await Customer.create({
          customer_name:customer.customer_name,
          customer_email:customer.customer_email,
          customer_phone:customer.customer_phone,
          city:customer.city,
          country: customer.country,
          address: customer.address,
          user_id: customer.user_id

      });
      newCustomer.save()
      res
          .status(200)
          .send({newCustomer, message: "New Customer Created Succesfully !" });
  } catch (error) {
      console.log(error);
      return res.status(400).send({ message: error.message });
  }
});
// Get single customer
const customer_single = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  // if customer doesnt exist
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }
  // Match customer to its user
  // if (customer.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  res.status(200).json(customer);
});

// Update customer
const customer_update = asyncHandler(async (req, res) => {
  const { customer_name, customer_email, customer_phone, city, country,address,user_id } = req.body;
  const { id } = req.params;

  const customer = await Customer.findById(id);

  // if customer doesnt exist
  if (!customer) {
    res.status(404);
    throw new Error("customer not found");
  }
  // Match customer to its user
  // if (customer.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  // Handle Image upload
  // let fileData = {};
  // if (req.file) {
  //   // Save image to cloudinary
  //   let uploadedFile;
  //   try {
  //     uploadedFile = await cloudinary.uploader.upload(req.file.path, {
  //       folder: "Pinvent App",
  //       resource_type: "image",
  //     });
  //   } catch (error) {
  //     res.status(500);
  //     throw new Error("Image could not be uploaded");
  //   }

  //   fileData = {
  //     fileName: req.file.originalname,
  //     filePath: uploadedFile.secure_url,
  //     fileType: req.file.mimetype,
  //     fileSize: fileSizeFormatter(req.file.size, 2),
  //   };
  // }

  // Update Product
  const updatedCustomer = await Customer.findByIdAndUpdate(
    { _id: id },
    {
      user_id,
      customer_name,
      customer_email,
      customer_phone,
      city,
      country,
      address
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCustomer);
});
// Delete customer
const customer_delete = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  // if customer doesnt exist
  if (!customer) {
    res.status(404);
    throw new Error("customer not found");
  }
  // Match customer to its user
  // if (customer.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  await customer.remove();
  res.status(200).json({ message: "customer deleted successfully." });
});

module.exports = {
  customer_create,
  customer_index,
  customer_single,
  customer_update,
  customer_delete,
};
