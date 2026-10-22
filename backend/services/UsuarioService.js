import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import Usuario from '../models/Usuario.js';

function gerarHash(senha) {
    const sal = randomBytes(16).toString('hex');
    const hash = scryptSync(senha, sal, 64).toString('hex');
    return `${sal}:${hash}`;
}

function conferirSenha(senha, senhaHash) {
    const [sal, hash] = senhaHash.split(':');
    const hashEsperado = Buffer.from(hash, 'hex');
    const hashCalculado = scryptSync(senha, sal, 64);
    return timingSafeEqual(hashEsperado, hashCalculado);
}

export function criarUsuarioService({ usuarioModel }) {
    async function cadastrar(dados) {
        const usuario = new Usuario({ id: 1, ...dados });
        const existente = await usuarioModel.buscarPorEmail(usuario.email);
        if (existente) throw new Error('Email já cadastrado');
        return usuarioModel.criar({
            nome: usuario.nome,
            email: usuario.email,
            senhaHash: gerarHash(usuario.senha)
        });
    }
    async function entrar({ email, senha }) {
        if (typeof email !== 'string' || typeof senha !== 'string') {
            throw new TypeError('Email e senha são obrigatórios');
        }
        const usuario = await usuarioModel.buscarPorEmail(email.trim().toLowerCase());
        if (!usuario || !conferirSenha(senha, usuario.senhaHash)) {
            throw new Error('Email ou senha inválidos');
        }
        return { id: usuario.id, nome: usuario.nome, email: usuario.email };
    }
    return { cadastrar, entrar };
}
