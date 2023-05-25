import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useProduct } from "../contexts/AdminProductContext";

// const validateImage = (value: File | undefined) => {
//   if (!value) {
//     return "Please add product image";
//   }

//   const supportedTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (!supportedTypes.includes(value.type)) {
//     return "Invalid file format";
//   }

//   return undefined; // Return undefined if the file is valid
// };

const ProductSchema = Yup.object({
  title: Yup.string().required("Please enter the title for the product"),
  price: Yup.number()
    .required("Please enter the price for the product")
    .min(1, "Price must be at least 1")
    .typeError("Price must be a number"),
  description: Yup.string().required("Please enter the description for the product"),
  brand: Yup.string(),
  imageId: Yup.string().required("Please add product image"),
  // _id: Yup.string().required("Please enter the product id"),
  inStockAmount: Yup.number()
    .required("Please enter the amount in stock")
    .min(1, "Amount in stock must be at least 1")
    .typeError("Amount in stock must be a number"),
  isArchived: Yup.boolean().required("Please specify whether the product is archived or not"),
});

export type ProductValues = Yup.InferType<typeof ProductSchema>;
export type NullableProductValues = Omit<ProductValues, "price"> & {
  price: ProductValues["price"] | null;
};

/**
 * Productform for adding and editing products
 */
function AddProductForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { addProduct, editProduct, products } = useProduct();
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p._id === id);

  const isEdit = Boolean(product);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imageResponse = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    if (!imageResponse.ok) {
      formik.setFieldError("imageId", "Error uploading image, please try again or with antoher image.");
      return; // Stop the function execution if image upload fails
    }

    const imageId = await imageResponse.json();
    // Handle image upload success

    console.log("Uploaded image id:", imageId);
    formik.setFieldValue("imageId", imageId); // Set formik.values.image with the selected file
  };

  const formik = useFormik<ProductValues>({
    initialValues: {
      title: isEdit ? product?.title ?? "" : "",
      price: isEdit ? product?.price ?? 0 : 0,
      description: isEdit ? product?.description ?? "" : "",
      brand: isEdit ? product?.brand ?? "" : "",
      imageId: isEdit ? product?.imageId ?? "" : "",
      // _id: isEdit ? product?._id ?? `b${Math.floor(Math.random() * 10000)}` : "",
      inStockAmount: isEdit ? product?.inStockAmount ?? 1 : 1,
      isArchived: false,
    },
    validationSchema: ProductSchema,
    onSubmit: async (product) => {
      console.log(product);
      try {
        if (isEdit) {
          // await editProduct(product);
        } else {
          console.log("Adding new product");
          await addProduct(product);
        }
        navigate("/admin");
      } catch (error) {
        // Visa felmeddelande för användaren.
      }
    },
  });

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <IconButton
        className="material-symbols-outlined"
        component={Link}
        to="/admin"
        sx={{
          marginTop: "1rem",
          color: theme.palette.text.primary,
        }}
      >
        arrow_back
      </IconButton>
      <Typography variant="h5" marginBottom={"1rem"} marginTop={"1rem"}>
        {isEdit ? "Edit Product" : "Add a new product"}
      </Typography>
      <Container
        sx={{
          width: isSmallScreen ? "sm" : "md",
          display: "flex",
          flexDirection: "column",
          padding: "0px !important",
        }}
      >
        <form onSubmit={formik.handleSubmit} style={rootStyle} data-cy="product-form">
          <Container
            sx={{
              padding: "0px !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField
              id="title"
              type="text"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              inputProps={{ "data-cy": "product-title" }}
              FormHelperTextProps={{ "data-cy": "product-title-error" } as any}
              sx={{ flex: 1 }}
            />
            <TextField
              id="price"
              type="number"
              name="price"
              label="Price"
              value={formik.values.price === 0 ? "" : formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.price && formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              inputProps={{ "data-cy": "product-price", min: 1, step: 1 }}
              FormHelperTextProps={{ "data-cy": "product-price-error" } as any}
              InputProps={{
                endAdornment: <InputAdornment position="start">SEK</InputAdornment>,
              }}
              sx={{ flex: 1 }}
            />
          </Container>
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField
              id="brand"
              type="text"
              name="brand"
              label="Brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.brand && formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
              sx={{ flex: 1 }}
            />
            <TextField
              id="image"
              type="file"
              name="imageId"
              onChange={handleImageChange}
              error={Boolean(formik.touched.imageId && formik.errors.imageId)}
              helperText={formik.touched.imageId && formik.errors.imageId}
              inputProps={{
                "data-cy": "product-image",
                accept: "image/*",
                lang: "en",
              }}
              FormHelperTextProps={{ "data-cy": "product-image-error" } as any}
              sx={{ flex: 1 }}
            />
          </Container>
          <TextField
            id="description"
            type="text"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.description && formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            inputProps={{ "data-cy": "product-description" }}
            FormHelperTextProps={{ "data-cy": "product-description-error" } as any}
          />
          <TextField
            id="inStockAmount"
            type="number"
            name="inStockAmount"
            label="Products in stock"
            value={formik.values.inStockAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.inStockAmount && formik.errors.inStockAmount)}
            helperText={formik.touched.inStockAmount && formik.errors.inStockAmount}
            inputProps={{ "data-cy": "product-inStockAmount", min: 1, step: 1 }}
            FormHelperTextProps={{ "data-cy": "product-inStockAmount-error" } as any}
            sx={{ flex: 1 }}
          />
          <Button type="submit" variant="contained">
            {isEdit ? "Edit Product" : "Add Product"}
          </Button>
        </form>
      </Container>
    </Container>
  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default AddProductForm;
