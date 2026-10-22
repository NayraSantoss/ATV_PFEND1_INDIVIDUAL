const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default class Usuario {
    constructor({ id, nome, email, senha }) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new TypeError('id deve ser inteiro positivo');
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new TypeError('Nome é obrigatorio');
        }
        if (typeof email !== 'string' || !padraoEmail.test(email.trim())) {
            throw new TypeError('Email deve ser válido');
        }
        if (typeof senha !== 'string' || senha.length < 6) {
            throw new TypeError('Senha deve ter no mínimo 6 caracteres');
        }
        Object.assign(this, {
            id, nome: nome.trim(), email: email.trim().toLowerCase(), senha
        });
    }
}
