const consultaBase = `
    SELECT p.id, p.nome, p.preco, p.preco_antigo AS precoAntigo, p.desconto,
           p.imagem, p.estoque, c.nome AS categoria
    FROM produtos p
    INNER JOIN categorias c ON c.id = p.categoria_id
`;

function converterProduto(linha) {
    return {
        ...linha,
        preco: Number(linha.preco),
        precoAntigo: Number(linha.precoAntigo)
    };
}

export function criarProdutoModel({ pool }) {
    async function listarTodos() {
        const [linhas] = await pool.query(`${consultaBase} ORDER BY p.id`);
        return linhas.map(converterProduto);
    }
    async function buscarPorId(id) {
        const [linhas] = await pool.query(`${consultaBase} WHERE p.id = ?`, [id]);
        if (linhas.length === 0) return null;
        return converterProduto(linhas[0]);
    }
    async function criar(produto) {
        const [categorias] = await pool.query('SELECT id FROM categorias WHERE nome = ?', [produto.categoria]);
        if (categorias.length === 0) {
            throw new TypeError(`Categoria ${produto.categoria} não cadastrada`);
        }
        const sql = 'INSERT INTO produtos (categoria_id, nome, preco, preco_antigo, desconto, imagem, estoque) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const valores = [
            categorias[0].id,
            produto.nome,
            produto.preco,
            produto.precoAntigo,
            produto.desconto,
            produto.imagem,
            produto.estoque
        ];
        const [resultado] = await pool.query(sql, valores);
        return { ...produto, id: resultado.insertId };
    }
    return { listarTodos, buscarPorId, criar };
}
