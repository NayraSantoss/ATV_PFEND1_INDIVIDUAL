"use client";

import "./header.css";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { usarLoja } from "../../contexto/ContextoLoja";

export default function Header() {
    const pathname = usePathname();
    const { usuario, quantidadeTotal, sair } = usarLoja();

    const [menuAberto, setMenuAberto] = useState(false);

    function sairDaConta() {
        sair();
        setMenuAberto(false);
    }

    return (
        <header className="header-topo">
            <Link href="/" className="header-logo">
                <Image src="/imagens/logo.png" alt="Aroma Importados" width={132} height={60} priority />
            </Link>

            <nav className="header-navegacao">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} href="/">
                            Início
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className={`nav-link ${pathname === "/produtos" ? "active" : ""}`} href="/produtos">
                            Produtos
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" href="/#contato">
                            Contato
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="header-acoes">
                <Link href="/carrinho" className="header-carrinho" aria-label="Abrir carrinho">
                    <i className="bi bi-cart3" aria-hidden="true"></i>
                    {quantidadeTotal > 0 && (
                        <span className="header-carrinho-contador">{quantidadeTotal}</span>
                    )}
                </Link>

                {!usuario ? (
                    <>
                        <Link href="/login" className="botao-entrar">
                            Entrar
                        </Link>

                        <Link href="/cadastro" className="botao-cadastrar">
                            Cadastrar
                        </Link>
                    </>
                ) : (
                    <div className="perfil-container">
                        <span className="perfil-nome">{usuario.nome.split(" ")[0]}</span>

                        <button type="button" className="perfil-botao" onClick={() => setMenuAberto(!menuAberto)} aria-label="Abrir menu do perfil" aria-expanded={menuAberto}>
                            <i className="bi bi-person-fill perfil-icone" aria-hidden="true"></i>
                        </button>

                        {menuAberto && (
                            <div className="perfil-menu">
                                <button type="button" className="perfil-sair" onClick={sairDaConta}>
                                    <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
                                    Sair da conta
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
