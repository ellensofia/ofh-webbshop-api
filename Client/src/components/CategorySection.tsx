import { Container, SxProps, Theme } from "@mui/material";
import { useCategoryContext } from "../contexts/CategoryContext";
import CategoryDropDown from "./CategoryDropDown";
import SelectedCategoriesList from "./SelectedCategoriesList";

export default function CategorySection() {
  const { selectedCategories } = useCategoryContext();

  return (
    <Container maxWidth="xl" sx={rootStyle}>
      <CategoryDropDown />
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
