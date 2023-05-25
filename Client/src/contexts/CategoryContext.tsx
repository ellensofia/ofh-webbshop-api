import { createContext, useContext, useEffect, useState } from "react";

type CategoryContextValue = {
  categories: Category[];
  selectedCategories: Category[];
  selectedCategoriesAdd: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setSelectedCategoriesAdd: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategoryToDb: (category: Category) => Promise<void>;
  fetchCategoriesFromDb: () => Promise<void>;
};

type CategoryProviderProps = {
  children: React.ReactNode;
};

export type Category = {
  _id: string;
  name: string;
};

const CategoryContext = createContext<CategoryContextValue | undefined>(undefined);

export const useCategoryContext: () => CategoryContextValue = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategoryContext must be used within CategoryProvider");
  }
  return context;
};

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedCategoriesAdd, setSelectedCategoriesAdd] = useState<Category[]>([]);

  const addCategoryToDb = async (category: Category) => {
    try {
      const response = await fetch("/api/categories/add", {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newCategory = await response.json();
      if (response.ok) {
        console.log("Category added:", newCategory);
        await fetchCategoriesFromDb();
      } else {
        console.error("Error adding category:", response.status);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const fetchCategoriesFromDb = async () => {
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

  useEffect(() => {
    fetchCategoriesFromDb();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategories,
        setCategories,
        setSelectedCategories,
        setSelectedCategoriesAdd,
        selectedCategoriesAdd,
        addCategoryToDb,
        fetchCategoriesFromDb,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
