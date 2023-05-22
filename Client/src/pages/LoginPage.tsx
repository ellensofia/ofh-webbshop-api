import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
    return (
        <div>
          <header>
            <HeaderMain />
          </header>
          <main>
            <LoginForm />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      );
}