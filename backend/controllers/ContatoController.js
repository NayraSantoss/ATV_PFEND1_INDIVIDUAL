export function criarContatoController({ contatoService }) {
    async function criar(req, res, next) {
        try {
            const contatoNovo = await contatoService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: contatoNovo });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }

    return { criar }
}
