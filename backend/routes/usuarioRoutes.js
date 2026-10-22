import express from 'express';

export function criarUsuarioRoutes({ usuarioController }) {
    const router = express.Router();

    router.post('/cadastro', usuarioController.cadastrar);
    router.post('/login', usuarioController.entrar);

    return router;
}
