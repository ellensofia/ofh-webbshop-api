import { Box, Button, Checkbox, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useCategoryContext } from "../contexts/CategoryContext";
import { theme } from "../theme/theme";

export default function CategoryDropDown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { categories, selectedCategories, setSelectedCategories } = useCategoryContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          borderColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.dark,
          position: "relative",
          fontSize: "12px",
          padding: " 5px 9px 5px 15px",
        }}
        onClick={handleMenuOpen}
      >
        Categories
        <span className="material-symbols-outlined">expand_more</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            top: isSmallScreen ? "157px !important" : "174px !important",
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
              onClick={() => handleCategoryToggle(category._id)}
              sx={{
                minWidth: "8.55rem",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 0.2rem 0 0.8rem",
              }}
            >
              <Typography variant="body2">{category.name}</Typography>
              <Checkbox
                checked={selectedCategories.some((selected) => selected._id === category._id)}
                color="secondary"
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
}
