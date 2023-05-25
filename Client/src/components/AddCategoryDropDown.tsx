import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useCategoryContext } from "../contexts/CategoryContext";

export default function AddCategoryDropDown() {
  const { categories, selectedCategoriesAdd, setSelectedCategoriesAdd } = useCategoryContext();

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategoriesAdd((prevSelectedCategories) => {
      if (prevSelectedCategories.some((category) => category._id === categoryId)) {
        return prevSelectedCategories.filter((category) => category._id !== categoryId);
      } else {
        const selectedCategoryAdd = categories.find((category) => category._id === categoryId);
        if (selectedCategoryAdd) {
          return [...prevSelectedCategories, selectedCategoryAdd];
        }
      }
      return prevSelectedCategories;
    });
  };

  return (
    <FormControl sx={{ flex: 1 }}>
      <InputLabel id="checkbox">Select categories</InputLabel>
      <Select
        labelId="checkbox"
        id="checkbox-select"
        multiple
        label="Categories"
        sx={{ flex: 1 }}
        value={selectedCategoriesAdd.map((category) => category._id)}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select categories</em>;
          }
          const categoryNames = categories
            .filter((category) => selected.includes(category._id))
            .map((category) => category.name);
          return categoryNames.join(", ");
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {category.name}
            <Checkbox
              checked={selectedCategoriesAdd.some((selected) => selected._id === category._id)}
              onChange={() => handleCategoryToggle(category._id)}
              color="secondary"
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
