import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import AdminOrderTable from "../components/adminOrderManagement/AdminOrderTable";
import { Order } from "../contexts/OrderContext";

function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      return await fetch("/api/orders", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <AdminOrderTable orders={orders} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminOrderPage;
