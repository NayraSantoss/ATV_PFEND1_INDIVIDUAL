"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [retorno, setRetorno] = useState(null);

  async function enviarContato(evento) {
    evento.preventDefault();
    setEnviando(true);
    setRetorno(null);

    try {
      const resposta = await fetch("/api/contatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });
      const corpo = await resposta.json();

      if (!resposta.ok) {
        setRetorno({ tipo: "erro", texto: corpo.erro || "Não foi possível enviar." });
      } else {
        setRetorno({ tipo: "sucesso", texto: "Mensagem enviada com sucesso!" });
        setNome("");
        setEmail("");
        setMensagem("");
      }
    } catch {
      setRetorno({ tipo: "erro", texto: "Servidor indisponível. Tente novamente." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="pagina">
      <section className="titulos">
        <h1>Perfumes Importados de Luxo</h1>
        <p>Escolha sua fragrância ideal</p>
      </section>

      <Image
        src="/imagens/bannerpromo.png"
        alt="Promoção em todos os perfumes"
        width={1200}
        height={600}
        priority
        className="banner-promocao"
      />

      <div className="categorias">
        <div className="cartao-categoria">
          <Image
            src="/imagens/perfumes_femininos.png"
            alt="Perfumes Femininos"
            width={300}
            height={220}
          />
          <h2>Perfumes Femininos</h2>
          <p>Elegância, sofisticação e delicadeza</p>
          <Link href="/produtos?categoria=Feminino">→ Ver Produtos</Link>
        </div>

        <div className="cartao-categoria">
          <Image
            src="/imagens/perfumes_masculinos.png"
            alt="Perfumes Masculinos"
            width={300}
            height={220}
          />
          <h2>Perfumes Masculinos</h2>
          <p>Presença, intensidade e estilo</p>
          <Link href="/produtos?categoria=Masculino">→ Ver Produtos</Link>
        </div>
      </div>

      <form className="formulario" onSubmit={enviarContato}>
        <p id="contato">Entre em Contato Conosco:</p>
        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensagem"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>

        {retorno && (
          <p className={retorno.tipo === "erro" ? "mensagem-erro" : "mensagem-sucesso"}>
            {retorno.texto}
          </p>
        )}
      </form>
    </main>
  );
}
