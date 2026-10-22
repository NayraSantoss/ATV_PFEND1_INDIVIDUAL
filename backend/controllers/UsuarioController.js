export function criarUsuarioController({ usuarioService }) {
    async function cadastrar(req, res, next) {
        try {
            const usuarioNovo = await usuarioService.cadastrar(req.body);
            res.status(201).json({ sucesso: true, dados: usuarioNovo });
        } catch (erro) {
            if (erro instanceof TypeError || erro.message.includes('já cadastrado')) {
                return res.status(400).json({ sucesso: false, erro: erro.message });
            }
            next(erro);
        }
    }
    async function entrar(req, res, next) {
        try {
            const usuario = await usuarioService.entrar(req.body);
            res.status(200).json({ sucesso: true, dados: usuario });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            if (erro.message.includes('inválidos')) return res.status(401).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }

    return { cadastrar, entrar }
}
