import { ObjectId } from "mongodb";
import * as Yup from "yup";

const productSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  price: Yup.number().min(1, "The product must has a price above 0.").required("Price is required."),
  description: Yup.string().required("Description is required."),
  brand: Yup.string(),
  imageId: Yup.string()
    .test("imageId", "Image is required.", (value) => {
      return value ? ObjectId.isValid(value) : false;
    })
    .required("Image is required."),
  inStockAmount: Yup.number().required("In stock amount is required."),
  isArchived: Yup.boolean().required("Is archived is required."),
});
