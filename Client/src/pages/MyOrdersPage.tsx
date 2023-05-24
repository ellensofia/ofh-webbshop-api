import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { MyOrdersList } from "../components/MyOrdersList";

export function MyOrdersPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <MyOrdersList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
