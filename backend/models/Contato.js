const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default class Contato {
    constructor({ id, nome, email, mensagem = '' }) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new TypeError('id deve ser inteiro positivo');
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new TypeError('Nome é obrigatorio');
        }
        if (typeof email !== 'string' || !padraoEmail.test(email.trim())) {
            throw new TypeError('Email deve ser válido');
        }
        if (typeof mensagem !== 'string') {
            throw new TypeError('Mensagem deve ser um texto');
        }
        Object.assign(this, {
            id, nome: nome.trim(), email: email.trim(), mensagem: mensagem.trim()
        });
    }
}
