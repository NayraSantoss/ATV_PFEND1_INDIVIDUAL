import Contato from '../models/Contato.js';

export function criarContatoService({ contatoModel }) {
    async function criar(dados) {
        const contato = new Contato({ id: 1, ...dados });
        return contatoModel.criar({
            nome: contato.nome,
            email: contato.email,
            mensagem: contato.mensagem
        });
    }
    return { criar };
}
