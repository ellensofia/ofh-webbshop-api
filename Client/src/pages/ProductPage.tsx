import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <ProductCard />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProductPage;
