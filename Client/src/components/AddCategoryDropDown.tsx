import { Checkbox, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { FormikProps } from "formik";
import { useCategoryContext } from "../contexts/CategoryContext";
import { ProductValues } from "./AddProductForm";

// interface Props {
//   value: any[];
//   onChange: {
//     (e: React.ChangeEvent<any>): void;
//     <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
//       ? void
//       : (e: string | React.ChangeEvent<any>) => void;
//   };
//   onBlur: () => {
//     (e: React.FocusEvent<any, Element>): void;
//     <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
//   };
// }

interface Props {
  formik: FormikProps<ProductValues>;
}

//** Component where you choose categories for a new product */
export default function AddCategoryDropDown(props: Props) {
  const { categories, selectedCategoriesAdd, setSelectedCategoriesAdd } = useCategoryContext();
  const { values, handleChange, handleBlur, touched, errors } = props.formik;

  // const { values, handleBlur, handleChange, touched } = useFormikContext<ProductValues>();

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

  console.log(Boolean(touched.categories && errors.categories), values.categories);

  return (
    <FormControl sx={{ flex: 1 }}>
      <InputLabel id="categories">Select categories</InputLabel>
      <Select
        labelId="categories"
        id="catecories"
        multiple
        name="categories"
        label="Categories"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.categories && errors.categories)}
        value={values.categories}
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
              id="checkbox"
              checked={values.categories.some((selectedId) => selectedId === category._id)}
              onChange={() =>
                props.formik.setFieldValue(
                  "categories",
                  !values.categories.includes(category._id)
                    ? [...values.categories, category._id]
                    : [...values.categories.filter((id) => id !== category._id)],
                )
              }
              color="secondary"
            />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{(touched.categories && errors.categories)?.toString()}</FormHelperText>
    </FormControl>
  );
}
