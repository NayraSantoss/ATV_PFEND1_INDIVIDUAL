export function criarContatoModel({ pool }) {
    async function criar(contato) {
        const sql = 'INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)';
        const [resultado] = await pool.query(sql, [contato.nome, contato.email, contato.mensagem]);
        return { ...contato, id: resultado.insertId };
    }
    return { criar };
}
