import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { UsersList } from "../components/UsersList";

export function UsersPage() {
  return (
    <div>
      <header>
        <HeaderMain />
      </header>
      <main>
        <UsersList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
