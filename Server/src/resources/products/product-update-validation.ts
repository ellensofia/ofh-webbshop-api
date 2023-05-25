import * as Yup from "yup";

const productUpdateValidationSchema = Yup.object()
  .shape({
    title: Yup.string().required(),
    imageId: Yup.string(),
    categories: Yup.string(),
    description: Yup.string(),
    inStockAmount: Yup.number(),
    price: Yup.number(),
    brand: Yup.string(),
    isArchived: Yup.boolean(),
    createdAt: Yup.string().required(),
  })
  .noUnknown();

export default productUpdateValidationSchema;