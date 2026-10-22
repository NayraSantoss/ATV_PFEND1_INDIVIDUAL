"use client";

import Image from "next/image";
import "./cardProduto.css";
import { formatarMoeda } from "../../utils/formatarMoeda";
import { usarLoja } from "../../contexto/ContextoLoja";

export default function CardProduto({ produto }) {
    const { adicionarAoCarrinho } = usarLoja();

    return (
        <article className="produto-card">
            {produto.desconto > 0 && (
                <span className="produto-card-desconto">-{produto.desconto}%</span>
            )}

            <div className="produto-card-imagem">
                <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    width={300}
                    height={260}
                    className="produto-card-foto"
                />
            </div>

            <div className="produto-card-conteudo">
                <h3>{produto.nome}</h3>

                <span className="produto-card-preco-antigo">
                    {formatarMoeda(produto.precoAntigo)}
                </span>

                <span className="produto-card-preco">
                    {formatarMoeda(produto.preco)}
                </span>

                <button
                    type="button"
                    className="produto-card-botao"
                    onClick={() => adicionarAoCarrinho(produto)}
                >
                    Adicionar ao Carrinho
                </button>
            </div>
        </article>
    );
}
