import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderSummary from "../components/OrderSummary";
import UserInfoOrder from "../components/UserInfoOrder";
import { Order } from "../contexts/OrderContext";

function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const orderId = useParams<{ id: string }>().id;

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [orderId]);

  if (!order) {
    return <p>Ingen order finns</p>;
  }

  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <OrderConfirmation order={order} />
        <OrderSummary order={order} />
        <UserInfoOrder order={order} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default OrderConfirmationPage;
