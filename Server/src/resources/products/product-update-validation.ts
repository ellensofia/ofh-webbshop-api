import * as Yup from "yup";

const productUpdateValidationSchema = Yup.object()
  .shape({
    title: Yup.string().required(),
    imageId: Yup.string().required(),
    categories: Yup.array().required(),
    description: Yup.string().required(),
    inStockAmount: Yup.number().required(),
    price: Yup.number().required(),
    brand: Yup.string().required(),
    isArchived: Yup.boolean().required(),
  })

export default productUpdateValidationSchema;