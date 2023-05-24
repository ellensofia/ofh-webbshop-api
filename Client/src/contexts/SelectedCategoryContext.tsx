import { createContext, useContext, useState } from "react";
import { Category } from "../components/CategorySection";

type SelectedCategoriesContextValue = {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type SelectedCategoriesProviderProps = {
  children: React.ReactNode;
};

const SelectedCategoriesContext = createContext<SelectedCategoriesContextValue | undefined>(undefined);

export const useSelectedCategories: () => SelectedCategoriesContextValue = () => {
  const context = useContext(SelectedCategoriesContext);
  console.log(context?.selectedCategories); // Output the selected categories

  if (!context) {
    throw new Error("useSelectedCategories must be used within SelectedCategoriesProvider");
  }
  return context;
};

export const SelectedCategoriesProvider: React.FC<SelectedCategoriesProviderProps> = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  return (
    <SelectedCategoriesContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </SelectedCategoriesContext.Provider>
  );
};
