import { Box, Button, Checkbox, Container, Menu, MenuItem, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../theme/theme";
import SelectedCategories from "./SelectedCategories";

export type Category = {
  _id: string;
  name: string;
};
export default function CategoryDropDown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

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
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
      <SelectedCategories categories={selectedCategories} />
    </Container>
  );
}

const rootStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginTop: "1.5rem",
};
