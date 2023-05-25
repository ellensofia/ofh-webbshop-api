import { Box, Button, Checkbox, Container, Menu, MenuItem, SxProps, Theme, Typography } from "@mui/material";
import { useState } from "react";
import { useCategoryContext } from "../contexts/CategoryContext";
import { theme } from "../theme/theme";
import SelectedCategoriesList from "./SelectedCategoriesList";

export default function CategorySection() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { categories, selectedCategories, setSelectedCategories } = useCategoryContext();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      // Find the category object with the matching categoryId
      const category = categories.find((category) => category._id === categoryId);
      // If the category is not found, return the previous selectedCategories
      if (!category) return prevSelectedCategories;
      // Check if the category is already in the selectedCategories
      if (prevSelectedCategories.some((selected) => selected._id === categoryId)) {
        // If the category is already selected, remove it from the selectedCategories
        return prevSelectedCategories.filter((selected) => selected._id !== categoryId);
      } else {
        // If the category is not selected, add it to the selectedCategories
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xl" sx={rootStyle}>
      <Button
        variant="outlined"
        sx={{
          borderColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.dark,
          position: "relative",
        }}
        onClick={handleMenuOpen}
      >
        Categories
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            top: "174px !important",
          },
          "& .MuiList-padding": {
            padding: "0px !important",
          },
        }}
      >
        <Box>
          {categories.map((category) => (
            <MenuItem
              key={category._id}
              sx={{
                minWidth: "8.4rem",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 0.2rem 0 0.8rem",
              }}
            >
              <Typography variant="body2">{category.name}</Typography>
              <Checkbox
                checked={selectedCategories.some((selected) => selected._id === category._id)}
                onChange={() => handleCategoryToggle(category._id)}
                color="secondary"
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
      <SelectedCategoriesList categories={selectedCategories} />
    </Container>
  );
}

const rootStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginTop: "1.5rem",
};