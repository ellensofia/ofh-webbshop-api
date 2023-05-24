import { Box, Typography } from "@mui/material";
import React from "react";
import { Category } from "./CategorySection";

type SelectedCategoriesProps = {
  categories: Category[];
};

const SelectedCategories: React.FC<SelectedCategoriesProps> = ({ categories }) => {
  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      {categories.map((category, index) => (
        <Typography key={category._id} variant="body2">
          {index > 0 && " | "} {category.name}
        </Typography>
      ))}
    </Box>
  );
};

export default SelectedCategories;
