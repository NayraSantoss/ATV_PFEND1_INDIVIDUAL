"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./cadastro.css";

export default function Cadastro() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    async function enviarCadastro(evento) {
        evento.preventDefault();
        setErro("");

        if (senha !== confirmarSenha) {
            setErro("As senhas não conferem.");
            return;
        }

        setEnviando(true);

        try {
            const resposta = await fetch("/api/usuarios/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });
            const corpo = await resposta.json();

            if (!resposta.ok) {
                setErro(corpo.erro || "Não foi possível cadastrar.");
                return;
            }

            router.push("/login");
        } catch {
            setErro("Servidor indisponível. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="autenticacao-pagina">
            <form className="formulario autenticacao-formulario" onSubmit={enviarCadastro}>
                <h1>Cadastro</h1>

                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="senha">Senha:</label>
                <div className="autenticacao-senha">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        minLength={6}
                        required
                    />

                    <button
                        type="button"
                        className="autenticacao-senha-botao"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? "Ocultar" : "Mostrar"}
                    </button>
                </div>

                <label htmlFor="confirmarSenha">Confirmar senha:</label>
                <div className="autenticacao-senha">
                    <input
                        type={mostrarConfirmacao ? "text" : "password"}
                        id="confirmarSenha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="autenticacao-senha-botao"
                        onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                    >
                        {mostrarConfirmacao ? "Ocultar" : "Mostrar"}
                    </button>
                </div>

                <button type="submit" disabled={enviando}>
                    {enviando ? "Cadastrando..." : "Cadastrar"}
                </button>

                {erro && <p className="mensagem-erro">{erro}</p>}

                <p className="autenticacao-troca">
                    Já possui uma conta?
                    <Link href="/login"> Fazer login</Link>
                </p>
            </form>
        </main>
    );
}
