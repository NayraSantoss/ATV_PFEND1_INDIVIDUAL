import express from 'express';

export function criarContatoRoutes({ contatoController }) {
    const router = express.Router();

    router.post('/', contatoController.criar);

    return router;
}
