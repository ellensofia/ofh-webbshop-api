import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";

function AdminProductFormPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <AddProductForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminProductFormPage;
