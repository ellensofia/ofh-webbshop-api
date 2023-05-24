import AddCategoryForm from "../components/AddCategoryForm";
import HeaderMain from "../components/HeaderMain";
import Footer from "../components/Footer";

export default function AdminCategoryPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <AddCategoryForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
