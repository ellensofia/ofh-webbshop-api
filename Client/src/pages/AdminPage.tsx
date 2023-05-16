import AdminTable from "../components/AdminTable";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";

function AdminPage() {
  return (
    <div>
      <HeaderMain />
      <main>
        <AdminTable />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminPage;
