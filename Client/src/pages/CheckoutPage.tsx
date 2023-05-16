import DeliveryForm from "../components/DeliveryForm";
import Footer from "../components/Footer";
import HeaderContinueShopping from "../components/HeaderContinueShopping";
import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartSummary from "../components/ShoppingCartSummary";
import { useOrder } from "../contexts/OrderContext";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import EmptyBagPage from "./EmptyBagPage";

function CheckoutPage() {
  const { totalItems } = useShoppingCart();
  const { order } = useOrder();

  if (totalItems === 0) {
    return (
      <div>
        <EmptyBagPage />
      </div>
    );
  }
  {
    return (
      <div>
        <header>
          <HeaderContinueShopping />
        </header>
        <main>
          <ShoppingCartCard />
          <ShoppingCartSummary />
          <DeliveryForm />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default CheckoutPage;
