import "./footer.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-conteudo">
                <Image src="/imagens/logo.png" alt="Aroma Importados" width={250} height={114} className="footer-logo" />

                <div>
                    <h3>Links</h3>
                    <Link href="/">Home</Link>
                    <Link href="/produtos">Produtos</Link>
                    <Link href="/#contato">Contato</Link>
                </div>

                <div>
                    <h3>Contato</h3>
                    <p>Email: aromaimportado@gmail.com</p>
                    <p>Telefone: (11) 97852-6475</p>
                </div>
            </div>

            <div className="footer-final">
                <p>© 2026 Aroma Importados. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
