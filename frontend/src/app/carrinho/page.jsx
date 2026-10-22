"use client";

import Link from "next/link";
import Image from "next/image";
import { usarLoja } from "../../contexto/ContextoLoja";
import { formatarMoeda } from "../../utils/formatarMoeda";
import "./carrinho.css";

export default function Carrinho() {
    const {
        itens: produtos,
        quantidadeTotal,
        alterarQuantidade,
        removerProduto,
        limparCarrinho,
    } = usarLoja();

    const subtotal = produtos.reduce(
        (total, produto) =>
            total + produto.preco * produto.quantidade,
        0
    );

    const frete = subtotal === 0 || subtotal >= 250 ? 0 : 15.90;
    const total = subtotal + frete;

    return (
        <main className="carrinho-pagina">
            <div className="container carrinho-container">

                <section className="carrinho-cabecalho">
                    <div>
                        <span className="carrinho-etiqueta">
                            AROMA IMPORTADOS / COMPRAS
                        </span>

                        <h1>
                            Meu <span>carrinho.</span>
                        </h1>

                        <p>
                            Confira seus produtos antes de continuar.
                        </p>
                    </div>

                    <div className="carrinho-contador">
                        <span className="contador-icone">🛒</span>

                        <div>
                            <strong>{quantidadeTotal}</strong>
                            <span>
                                {quantidadeTotal === 1
                                    ? "item no carrinho"
                                    : "itens no carrinho"}
                            </span>
                        </div>
                    </div>
                </section>

                {produtos.length > 0 ? (
                    <div className="row g-4">

                        <section className="col-lg-8">
                            <div className="carrinho-lista-cabecalho">
                                <h2>Seus produtos</h2>

                                <button
                                    type="button"
                                    className="limpar-carrinho"
                                    onClick={limparCarrinho}
                                >
                                    Limpar carrinho
                                </button>
                            </div>

                            <div className="carrinho-lista">
                                {produtos.map((produto) => (
                                    <article
                                        className="carrinho-item"
                                        key={produto.id}
                                    >
                                        <div className="produto-visual">
                                            <Image
                                                src={produto.imagem}
                                                alt={produto.nome}
                                                width={100}
                                                height={105}
                                            />
                                        </div>

                                        <div className="produto-informacoes">
                                            <span className="produto-categoria">
                                                {produto.categoria}
                                            </span>

                                            <h3>{produto.nome}</h3>

                                            <p>
                                                {formatarMoeda(produto.preco)}
                                                <span> / unidade</span>
                                            </p>

                                            <button
                                                type="button"
                                                className="produto-remover remover-mobile"
                                                onClick={() =>
                                                    removerProduto(produto.id)
                                                }
                                            >
                                                Remover
                                            </button>
                                        </div>

                                        <div className="produto-controles">
                                            <span className="quantidade-rotulo">
                                                Quantidade
                                            </span>

                                            <div className="quantidade-controle">
                                                <button
                                                    type="button"
                                                    aria-label={`Diminuir quantidade de ${produto.nome}`}
                                                    disabled={produto.quantidade <= 1}
                                                    onClick={() =>
                                                        alterarQuantidade(
                                                            produto.id,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span>
                                                    {produto.quantidade}
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label={`Aumentar quantidade de ${produto.nome}`}
                                                    onClick={() =>
                                                        alterarQuantidade(
                                                            produto.id,
                                                            1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="produto-total">
                                            <strong>
                                                {formatarMoeda(
                                                    produto.preco *
                                                    produto.quantidade
                                                )}
                                            </strong>

                                            <button
                                                type="button"
                                                className="produto-remover remover-desktop"
                                                onClick={() =>
                                                    removerProduto(produto.id)
                                                }
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <Link
                                href="/produtos"
                                className="continuar-comprando"
                            >
                                <span>←</span>
                                Continuar comprando
                            </Link>
                        </section>

                        <aside className="col-lg-4">
                            <div className="resumo-carrinho">
                                <span className="resumo-etiqueta">
                                    RESUMO DO PEDIDO
                                </span>

                                <h2>Resumo da compra</h2>

                                <div className="resumo-linha">
                                    <span>
                                        Subtotal ({quantidadeTotal}{" "}
                                        {quantidadeTotal === 1
                                            ? "item"
                                            : "itens"})
                                    </span>

                                    <strong>
                                        {formatarMoeda(subtotal)}
                                    </strong>
                                </div>

                                <div className="resumo-linha">
                                    <span>Frete estimado</span>

                                    <strong className={frete === 0 ? "frete-gratis" : ""}>
                                        {frete === 0
                                            ? "Grátis"
                                            : formatarMoeda(frete)}
                                    </strong>
                                </div>

                                {subtotal > 0 && subtotal < 250 && (
                                    <p className="aviso-frete">
                                        Faltam {formatarMoeda(250 - subtotal)}
                                        {" "}para obter frete grátis.
                                    </p>
                                )}

                                {subtotal >= 250 && (
                                    <p className="aviso-frete">
                                        Você ganhou frete grátis!
                                    </p>
                                )}

                                <div className="resumo-separador"></div>

                                <div className="resumo-total">
                                    <span>Total</span>
                                    <strong>{formatarMoeda(total)}</strong>
                                </div>

                                <span className="resumo-observacao">
                                    Frete e condições sujeitos à confirmação.
                                </span>

                                <Link
                                    href="/pagamento"
                                    className="finalizar-compra"
                                >
                                    Finalizar compra
                                    <span>→</span>
                                </Link>

                                <div className="compra-segura">
                                    <span>✓</span>
                                    <p>
                                        Sua próxima etapa de compra começa aqui.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <section className="carrinho-vazio">
                        <div className="carrinho-vazio-icone">🛒</div>

                        <h2>Seu carrinho está vazio</h2>

                        <p>
                            Parece que você ainda não adicionou
                            nenhum produto.
                        </p>

                        <Link href="/produtos" className="botao-principal">
                            Explorar produtos
                            <span>→</span>
                        </Link>
                    </section>
                )}

            </div>
        </main>
    );
}
