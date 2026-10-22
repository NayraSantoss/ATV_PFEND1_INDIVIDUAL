"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ContextoLoja = createContext(null);

const chaveCarrinho = "aroma_carrinho";
const chaveUsuario = "aroma_usuario";

export function ProvedorLoja({ children }) {
    const [itens, setItens] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        try {
            const carrinhoSalvo = localStorage.getItem(chaveCarrinho);
            const usuarioSalvo = localStorage.getItem(chaveUsuario);
            if (carrinhoSalvo) setItens(JSON.parse(carrinhoSalvo));
            if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
        } catch {
            localStorage.removeItem(chaveCarrinho);
            localStorage.removeItem(chaveUsuario);
        }
        setCarregado(true);
    }, []);

    useEffect(() => {
        if (!carregado) return;
        localStorage.setItem(chaveCarrinho, JSON.stringify(itens));
    }, [itens, carregado]);

    useEffect(() => {
        if (!carregado) return;
        if (usuario) {
            localStorage.setItem(chaveUsuario, JSON.stringify(usuario));
        } else {
            localStorage.removeItem(chaveUsuario);
        }
    }, [usuario, carregado]);

    function adicionarAoCarrinho(produto) {
        setItens((listaAtual) => {
            const existente = listaAtual.find((item) => item.id === produto.id);
            if (existente) {
                return listaAtual.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }
            return [
                ...listaAtual,
                {
                    id: produto.id,
                    nome: produto.nome,
                    categoria: produto.categoria,
                    preco: produto.preco,
                    imagem: produto.imagem,
                    quantidade: 1,
                },
            ];
        });
    }

    function alterarQuantidade(id, variacao) {
        setItens((listaAtual) =>
            listaAtual.map((item) =>
                item.id === id
                    ? { ...item, quantidade: Math.max(1, item.quantidade + variacao) }
                    : item
            )
        );
    }

    function removerProduto(id) {
        setItens((listaAtual) => listaAtual.filter((item) => item.id !== id));
    }

    function limparCarrinho() {
        setItens([]);
    }

    function entrar(dadosUsuario) {
        setUsuario(dadosUsuario);
    }

    function sair() {
        setUsuario(null);
    }

    const quantidadeTotal = itens.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const valor = {
        itens,
        usuario,
        quantidadeTotal,
        adicionarAoCarrinho,
        alterarQuantidade,
        removerProduto,
        limparCarrinho,
        entrar,
        sair,
    };

    return <ContextoLoja.Provider value={valor}>{children}</ContextoLoja.Provider>;
}

export function usarLoja() {
    return useContext(ContextoLoja);
}
