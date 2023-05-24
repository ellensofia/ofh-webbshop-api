import { Box, Typography } from "@mui/material";
import React from "react";

type SelectedCategoriesProps = {
  categories: string[];
};

const SelectedCategories: React.FC<SelectedCategoriesProps> = ({ categories }) => {
  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      {categories.map((category) => (
        <Typography key={category} variant="body2">
          | {category}
        </Typography>
      ))}
    </Box>
  );
};

export default SelectedCategories;
