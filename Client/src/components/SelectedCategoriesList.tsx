import { Box, Typography } from "@mui/material";
import { useSelectedCategories } from "../contexts/SelectedCategoryContext";
import { Category } from "./CategorySection";

type SelectedCategoriesProps = {
  categories: Category[];
};

export default function SelectedCategoriesList({ categories }: SelectedCategoriesProps) {
  const { setSelectedCategories } = useSelectedCategories();

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
