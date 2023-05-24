import { Button, Container, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { theme } from "../theme/theme";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CategorySchema = Yup.object({
  name: Yup.string().required("Please enter the name for the category"),
});

type Category = {
  _id: string;
  name: string;
};
export type CategoryValues = Yup.InferType<typeof CategorySchema>;

export default function AddCategoryForm() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      } else {
        console.error("Error fetching categories:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formik = useFormik<CategoryValues>({
    initialValues: {
      name: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (category) => {
      try {
        const response = await fetch("/api/categories/add", {
          method: "POST",
          body: JSON.stringify(category),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const newCategory = await response.json();
        if (response.ok) {
          console.log("Category added:", newCategory);
          await fetchCategories();
          formik.resetForm();
        } else {
          console.error("Error adding category:", response.status);
        }
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
