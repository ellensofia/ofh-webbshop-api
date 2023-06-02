import { SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { Product, useProduct } from "../contexts/AdminProductContext";

function AdminProductFormPage() {
  const { getOneProduct } = useProduct();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const renderEditForm = async () => {
      if (!id) return;
      await getOneProduct(id)
        .then((product) => setProduct(product))
        .then(() => setIsLoading(false));
    };

    renderEditForm();
  }, [id, getOneProduct]);

  const editComponent = isLoading ? (
    <Typography sx={styledTypography} variant="h6">
      Loading...
    </Typography>
  ) : product ? (
    <AddProductForm product={product} />
  ) : (
    <Typography sx={styledTypography} variant="h6">
      Product not found.
    </Typography>
  );

  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>{id ? editComponent : <AddProductForm product={undefined} />}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

const styledTypography: SxProps = {
  textAlign: "center",
  paddingTop: "4rem",
};

export default AdminProductFormPage;
