import DeliveryForm from "../components/DeliveryForm";
import Footer from "../components/Footer";
import HeaderContinueShopping from "../components/HeaderContinueShopping";
import { LoginRequet } from "../components/LoginRequest";
import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartSummary from "../components/ShoppingCartSummary";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { useCheckIsLoggedIn } from "../hooks/checkedLoggedin";
import EmptyBagPage from "./EmptyBagPage";

function CheckoutPage() {
  const { totalItems } = useShoppingCart();
  const isLoggedIn = useCheckIsLoggedIn();

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
          {isLoggedIn ? <DeliveryForm /> : <LoginRequet />}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default CheckoutPage;
