import { Box, Typography } from "@mui/material";
import { Category, useCategoryContext } from "../contexts/CategoryContext";

type SelectedCategoriesProps = {
  categories: Category[];
};

export default function SelectedCategoriesList({ categories }: SelectedCategoriesProps) {
  const { setSelectedCategories } = useCategoryContext();

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      {categories.map((category, index) => (
        <Typography key={category._id} variant="body2">
          {index > 0 && " | "} {category.name}
        </Typography>
      ))}
    </Box>
  );
}
