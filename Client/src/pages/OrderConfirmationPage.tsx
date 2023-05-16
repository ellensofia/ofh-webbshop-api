import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderSummary from "../components/OrderSummary";
import UserInfoOrder from "../components/UserInfoOrder";
import { useOrder } from "../contexts/OrderContext";

function OrderConfirmationPage() {
  const { order } = useOrder();

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
