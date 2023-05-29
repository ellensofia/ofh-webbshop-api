import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { OrderDetails } from "../components/OrderDetails";

export function OrderDetailsPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <OrderDetails />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
