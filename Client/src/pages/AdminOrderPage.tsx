import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import AdminOrderTable from "../components/adminOrderManagement/AdminOrderTable";

function AdminOrderPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <AdminOrderTable />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminOrderPage;
