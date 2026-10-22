export function criarUsuarioModel({ pool }) {
    async function buscarPorEmail(email) {
        const [linhas] = await pool.query(
            'SELECT id, nome, email, senha_hash AS senhaHash FROM usuarios WHERE email = ?',
            [email]
        );
        if (linhas.length === 0) return null;
        return linhas[0];
    }
    async function criar(usuario) {
        const sql = 'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)';
        const [resultado] = await pool.query(sql, [usuario.nome, usuario.email, usuario.senhaHash]);
        return { id: resultado.insertId, nome: usuario.nome, email: usuario.email };
    }
    return { buscarPorEmail, criar };
}
