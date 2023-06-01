import { useParams } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { useProduct } from "../contexts/AdminProductContext";

function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const product = products.find((p) => p._id === id);

  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <AddProductForm product={product} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminProductFormPage;
