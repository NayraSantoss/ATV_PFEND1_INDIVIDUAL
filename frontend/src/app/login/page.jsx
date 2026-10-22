"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usarLoja } from "../../contexto/ContextoLoja";
import "./login.css";

export default function Login() {
    const router = useRouter();
    const { entrar } = usarLoja();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    async function enviarLogin(evento) {
        evento.preventDefault();
        setEnviando(true);
        setErro("");

        try {
            const resposta = await fetch("/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            const corpo = await resposta.json();

            if (!resposta.ok) {
                setErro(corpo.erro || "Não foi possível entrar.");
                return;
            }

            entrar(corpo.dados);
            router.push("/");
        } catch {
            setErro("Servidor indisponível. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="autenticacao-pagina">
            <form className="formulario autenticacao-formulario" onSubmit={enviarLogin}>
                <h1>Login</h1>

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="senha">Senha:</label>
                <div className="autenticacao-senha">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        id="senha"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="autenticacao-senha-botao"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {mostrarSenha ? "Ocultar" : "Mostrar"}
                    </button>
                </div>

                <button type="submit" disabled={enviando}>
                    {enviando ? "Entrando..." : "Entrar"}
                </button>

                {erro && <p className="mensagem-erro">{erro}</p>}

                <p className="autenticacao-troca">
                    Ainda não tem uma conta?
                    <Link href="/cadastro"> Criar conta</Link>
                </p>
            </form>
        </main>
    );
}
