const Product = require("../models/product");
const CustomError = require("../utils/customError");
const PromiseHandler = require("../utils/promiseHandler");
const cloudinary = require("cloudinary");

exports.addProduct = PromiseHandler(async (req, res, next) => {
  console.log("from server", req.files);

  if (!req.files) {
    return next(new CustomError("images are required", 401));
  }

  if (req.files) {
    let result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "products",
      }
    );

    req.body.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  const product = await Product.create(req.body);
  res.status(200).json(product);
});

exports.deleteProduct = PromiseHandler(async (req, res, next) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }

  //destroy the existing image
  const imgRes = await cloudinary.v2.uploader.destroy(product.photo.id);

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product was deleted !",
  });
});

exports.adminUpdateOneProduct = PromiseHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }
  console.log(req.body);
  if (req.files) {
    //destroy the existing image

    const cloudRes = await cloudinary.v2.uploader.destroy(product.photo.id);

    let result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "products",
      }
    );

    req.body.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  } else {
    req.body.photo = {
      id: product.photo.id,
      secure_url: product.photo.secure_url,
    };
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json(product);
});

exports.getAllProducts = PromiseHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
});

exports.getProduct = PromiseHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  res.status(200).json(product);
});
