import {
  Box,
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
import { CSSProperties, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Product, useProduct } from "../contexts/AdminProductContext";
import AddCategoryDropDown from "./AddCategoryDropDown";

const ProductSchema = Yup.object({
  title: Yup.string().required("Please enter the title for the product"),
  price: Yup.number()
    .required("Please enter the price for the product")
    .min(1, "Price must be at least 1")
    .typeError("Price must be a number"),
  description: Yup.string().required("Please enter the description for the product"),
  brand: Yup.string(),
  categories: Yup.array().min(1).required("Please select at least one category"),
  imageId: Yup.string().required("Please add product image"),
  inStockAmount: Yup.number()
    .min(1)
    .required("Please enter the amount in stock")
    .min(1, "Amount in stock must be at least 1")
    .typeError("Amount in stock must be a number"),
  isArchived: Yup.boolean().required("Please specify whether the product is archived or not"),
});

export type ProductValues = Yup.InferType<typeof ProductSchema>;
export type NullableProductValues = Omit<ProductValues, "price"> & {
  price: ProductValues["price"] | null;
};

interface Props {
  product: Product | undefined;
}

/**
 * Productform for adding and editing products
 */
function AddProductForm(props: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { addProduct, editProduct } = useProduct();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedPreviewImage, setSelectedPreviewImage] = useState("");
  const { product } = props;

  const isEdit = Boolean(product);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);

    const formData = new FormData();
    formData.append("image", file);

    const imageResponse = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    if (!imageResponse.ok) {
      formik.setFieldError("imageId", "Error uploading image, please try again or choose another image.");
      return;
    }

    const imageId = await imageResponse.json();

    formik.setFieldValue("imageId", imageId);

    // The FileReader API reads the content of a file and converts it into a data URL.
    // It reads the file using the readAsDataURL method and triggers the onload event
    // when the reading is complete.
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChooseFile = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // This useEffect fetches and displays the image preview when in edit mode.
  // The image data is retireved as a Blob object and creates a FileReader instance
  // to read the Blob data. When the FileReader finishes reading the data (onloadend event),
  // it sets the base64 string representation of the image data as the imagePreview.
  useEffect(() => {
    if (isEdit && product?.imageId) {
      const fetchImage = async () => {
        const response = await fetch(`/api/images/${product.imageId}`);

        if (response.ok) {
          // Get the image data as a Blob object (Binary Large Object)
          const imageBlob = await response.blob();

          const reader = new FileReader();

          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };

          reader.readAsDataURL(imageBlob);
        }
      };
      fetchImage();
      setSelectedPreviewImage(product.imageId);
    }
  }, [isEdit, product]);

  const formik = useFormik<ProductValues>({
    initialValues: {
      title: isEdit ? product?.title ?? "" : "",
      price: isEdit ? product?.price ?? 0 : 0,
      description: isEdit ? product?.description ?? "" : "",
      brand: isEdit ? product?.brand ?? "" : "",
      categories: isEdit ? product?.categories ?? [] : [],
      imageId: isEdit ? product?.imageId ?? "" : "",
      inStockAmount: isEdit ? product?.inStockAmount ?? 1 : 1,
      isArchived: false,
    },
    validationSchema: ProductSchema,
    onSubmit: async (newValues) => {
      try {
        if (isEdit) {
          if (!product) throw new Error("No product found.");
          editProduct({
            ...product,
            ...newValues,
          });
        } else {
          await addProduct(newValues);
        }
        navigate("/admin");
      } catch (error) {
        console.log(error);
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
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
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
            <AddCategoryDropDown formik={formik} />
          </Container>
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <TextField
              id="image"
              type="text"
              name="image"
              value={selectedFileName}
              placeholder={isEdit ? "Change to new image" : "No image uploaded"}
              error={Boolean(formik.touched.imageId && formik.errors.imageId)}
              helperText={formik.touched.imageId && formik.errors.imageId}
              FormHelperTextProps={{ "data-cy": "product-image-error" } as any}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleChooseFile}
              sx={{ fontSize: { xs: "0.7rem", sm: "0.85rem", height: "56px" } }}
            >
              {isEdit ? "Change file" : "Choose file"}
            </Button>
            <input
              id="file-input"
              type="file"
              name="imageId"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </Container>
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "#606060" }}>
                Preview
              </Typography>
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  sx={{
                    width: "50%",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                    height: { xs: "10rem", sm: "20rem" },
                    border: "1px solid #60606069",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: "#606060" }}>
                    No image uploaded
                  </Typography>
                </Box>
              )}
            </Box>
          </Container>
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
