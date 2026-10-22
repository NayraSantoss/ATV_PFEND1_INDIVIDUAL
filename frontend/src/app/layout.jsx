import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { ProvedorLoja } from "../contexto/ContextoLoja";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Aroma Importados",
  description: "Perfumes importados de luxo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <ProvedorLoja>
          <Header />
          {children}
          <Footer />
        </ProvedorLoja>
      </body>
    </html>
  );
}
