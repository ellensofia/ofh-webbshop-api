import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { Order } from "../contexts/OrderContext";

function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const orderId = useParams<{ orderId: string }>().orderId;

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        console.log(data);
      });
  });

  if (!order) {
    // visa alt ui eller gå till startsida
    // return <Navigate to="/" />;
    return <p>Ingen order finns</p>;
  }

  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        {/* <OrderConfirmation order={order} />
        <OrderSummary order={order} />
        <UserInfoOrder order={order} /> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default OrderConfirmationPage;
