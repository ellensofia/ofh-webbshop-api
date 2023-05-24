import CategoryDropDown from "../components/CategoryDropDown";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import ProductGallery from "../components/ProductGallery";

function StartPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <CategoryDropDown />
        <ProductGallery />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default StartPage;
