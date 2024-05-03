//product section
import mongoose from "mongoose";

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("productModel", schemaProduct);
export default productModel;
