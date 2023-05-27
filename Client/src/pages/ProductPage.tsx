// import { NavigateNext } from "@mui/icons-material";
import { Container, Link, SxProps, Theme, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../contexts/AdminProductContext";
import { useCategoryContext } from "../contexts/CategoryContext";

import Breadcrumbs from "@mui/material/Breadcrumbs";

function ProductPage() {
  const { categories } = useCategoryContext();
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const product = products.find((p) => p._id === id);

  // Get all categories from current product
  const productCategories = product?.categories.map((categoryId) => {
    const category = categories.find((c) => c._id === String(categoryId));
    return category?.name;
  });

  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <Container maxWidth="lg" sx={rootStyle}>
          <Breadcrumbs separator="/">
            <Link
              color="inherit"
              to="/"
              component={RouterLink}
              sx={{
                fontSize: "0.75rem",
                color: "#4b4b4b",
                textDecoration: "none",
                fontWeight: "300",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Products
            </Link>
            {productCategories &&
              productCategories.map((category, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.primary"
                  sx={{ fontFamily: "Prata", fontSize: "0.75rem", color: "#4b4b4b" }}
                >
                  {category}
                </Typography>
              ))}
          </Breadcrumbs>
        </Container>
        <ProductCard />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProductPage;

const rootStyle: SxProps<Theme> = {
  display: "flex",
  // justifyContent: "center",
  marginTop: "1rem",
  marginBottom: "-.5rem",
};
