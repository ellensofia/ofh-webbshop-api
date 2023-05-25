import { Button, Container, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useCategoryContext } from "../contexts/CategoryContext";
import { theme } from "../theme/theme";

const CategorySchema = Yup.object({
  name: Yup.string().required("Please enter the name for the category"),
});

export type CategoryValues = Yup.InferType<typeof CategorySchema>;

export default function AddCategoryForm() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { categories, addCategoryToDb } = useCategoryContext();

  const formik = useFormik<CategoryValues>({
    initialValues: {
      name: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (values) => {
      try {
        const category = {
          _id: `c${Math.floor(Math.random() * 10000)}`,
          name: values.name,
        };
        await addCategoryToDb(category);
        formik.resetForm();
      } catch (error) {
        console.error("Error adding category:", error);
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
      <Typography variant="h5" sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
        Categories
      </Typography>

      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem", marginTop: "1rem" }}>
        {categories &&
          categories.map((category) => (
            <Typography variant="body1" key={category._id} sx={{ textDecoration: "underlined" }}>
              {category.name}
            </Typography>
          ))}
      </Box>
      <Container
        sx={{
          width: isSmallScreen ? "sm" : "md",
          display: "flex",
          flexDirection: "column",
          padding: "0px !important",
        }}
      >
        <form onSubmit={formik.handleSubmit} style={rootStyle}>
          <TextField
            id="name"
            type="text"
            name="name"
            label="Category"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button type="submit" variant="contained">
            Add Category
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
