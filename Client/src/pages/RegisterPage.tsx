import Footer from "../components/Footer";
import HeaderMain from "../components/HeaderMain";
import { RegisterFrom } from "../components/RegisterForm";

export function RegisterPage() {
    return (
        <div>
          <header>
            <HeaderMain />
          </header>
          <main>
            <RegisterFrom />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      );
}