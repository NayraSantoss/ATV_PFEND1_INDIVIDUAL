"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CardProduto from "../../components/cardProduto";
import "./produtos.css";

const categorias = ["Todos", "Feminino", "Masculino"];

const tituloCategoria = {
    Feminino: "Perfumes Femininos",
    Masculino: "Perfumes Masculinos",
};

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [pesquisa, setPesquisa] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
    const [ordenacao, setOrdenacao] = useState("padrao");

    useEffect(() => {
        const categoriaDaUrl = new URLSearchParams(window.location.search).get("categoria");
        if (categoriaDaUrl && categorias.includes(categoriaDaUrl)) {
            setCategoriaSelecionada(categoriaDaUrl);
        }
    }, []);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const resposta = await fetch("/api/produtos");
                if (!resposta.ok) throw new Error("Falha ao carregar");
                const corpo = await resposta.json();
                setProdutos(corpo.dados);
            } catch {
                setErro("Não foi possível carregar os produtos. Verifique se o servidor está em execução.");
            } finally {
                setCarregando(false);
            }
        }
        carregarProdutos();
    }, []);

    const produtosFiltrados = produtos
        .filter((produto) => {
            const correspondePesquisa = produto.nome
                .toLowerCase()
                .includes(pesquisa.toLowerCase());

            const correspondeCategoria =
                categoriaSelecionada === "Todos" ||
                produto.categoria === categoriaSelecionada;

            return correspondePesquisa && correspondeCategoria;
        })
        .sort((a, b) => {
            if (ordenacao === "menor-preco") {
                return a.preco - b.preco;
            }

            if (ordenacao === "maior-preco") {
                return b.preco - a.preco;
            }

            if (ordenacao === "nome") {
                return a.nome.localeCompare(b.nome);
            }

            return a.id - b.id;
        });

    const secoes = ["Feminino", "Masculino"]
        .map((categoria) => ({
            categoria,
            itens: produtosFiltrados.filter((produto) => produto.categoria === categoria),
        }))
        .filter((secao) => secao.itens.length > 0);

    return (
        <main className="pagina-produtos">
            <section className="produtos-titulo">
                <h2><b>SITE INTEIRO EM PROMOÇÃO!!</b></h2>

                <Image
                    src="/imagens/bannerpromo.png"
                    alt="Promoção em todos os perfumes"
                    width={1000}
                    height={500}
                    className="produtos-banner"
                />
            </section>

            <section className="produtos-filtros">
                <div className="produtos-pesquisa">
                    <i className="bi bi-search" />

                    <input
                        type="search"
                        placeholder="Buscar perfume..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        aria-label="Buscar produtos pelo nome"
                    />
                </div>

                <div className="produtos-categorias">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            type="button"
                            className={
                                categoriaSelecionada === categoria
                                    ? "categoria-filtro ativo"
                                    : "categoria-filtro"
                            }
                            onClick={() => setCategoriaSelecionada(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                <div className="produtos-ordenacao">
                    <label htmlFor="ordenacao">Ordenar por:</label>

                    <select
                        id="ordenacao"
                        value={ordenacao}
                        onChange={(e) => setOrdenacao(e.target.value)}
                    >
                        <option value="padrao">Padrão</option>
                        <option value="menor-preco">Menor preço</option>
                        <option value="maior-preco">Maior preço</option>
                        <option value="nome">Nome A–Z</option>
                    </select>
                </div>
            </section>

            {carregando && (
                <div className="produtos-estado">
                    <h3>Carregando produtos...</h3>
                </div>
            )}

            {!carregando && erro && (
                <div className="produtos-estado">
                    <h3>Ops!</h3>
                    <p>{erro}</p>
                </div>
            )}

            {!carregando && !erro && (
                <>
                    <p className="produtos-quantidade">
                        {produtosFiltrados.length}{" "}
                        {produtosFiltrados.length === 1
                            ? "produto encontrado"
                            : "produtos encontrados"}
                    </p>

                    {secoes.length > 0 ? (
                        secoes.map((secao) => (
                            <section key={secao.categoria}>
                                <h2
                                    className="produtos-secao-titulo"
                                    id={secao.categoria.toLowerCase()}
                                >
                                    <b>{tituloCategoria[secao.categoria]}</b>
                                </h2>

                                <div className="produtos-grade">
                                    {secao.itens.map((produto) => (
                                        <CardProduto key={produto.id} produto={produto} />
                                    ))}
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="produtos-estado">
                            <h3>Nenhum produto encontrado</h3>
                            <p>Tente mudar a pesquisa ou selecionar outra categoria.</p>

                            <button
                                type="button"
                                onClick={() => {
                                    setPesquisa("");
                                    setCategoriaSelecionada("Todos");
                                    setOrdenacao("padrao");
                                }}
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
