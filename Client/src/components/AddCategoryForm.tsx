import { Button, Container, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { theme } from "../theme/theme";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const CategorySchema = Yup.object({
  name: Yup.string().required("Please enter the name for the category"),
});

export type CategoryValues = Yup.InferType<typeof CategorySchema>;

export default function AddCategory() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const formik = useFormik<CategoryValues>({
    initialValues: {
      name: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (category) => {
      try {
        const response = await fetch("/api/category/add", {
          method: "POST",
          body: JSON.stringify(category),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const newCategory = await response.json();
        if (response.ok) {
          console.log("Category added:", newCategory);
          // Uppdatera listan över kategorier eller utför någon annan åtgärd
        } else {
          console.error("Error adding category:", response.status);
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
  });

  const categories = ["decoration", "furniture", "paintings"];

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
        {categories.map((category) => (
          <Typography variant="body1" key={category} sx={{ textDecoration: "underlined" }}>
            {category}
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
            inputProps={{ "data-cy": "category-name" }}
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
