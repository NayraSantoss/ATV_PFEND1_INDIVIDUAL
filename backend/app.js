import express from 'express';
import { criarPool } from './config/database.js';
import { criarProdutoModel } from './models/ProdutoModels.js';
import { criarProdutoService } from './services/ProdutoService.js';
import { criarProdutoController } from './controllers/ProdutoController.js';
import { criarProdutoRoutes } from './routes/produtoRoutes.js';
import { criarUsuarioModel } from './models/UsuarioModels.js';
import { criarUsuarioService } from './services/UsuarioService.js';
import { criarUsuarioController } from './controllers/UsuarioController.js';
import { criarUsuarioRoutes } from './routes/usuarioRoutes.js';
import { criarContatoModel } from './models/ContatoModels.js';
import { criarContatoService } from './services/ContatoService.js';
import { criarContatoController } from './controllers/ContatoController.js';
import { criarContatoRoutes } from './routes/contatoRoutes.js';

export const app = express();

app.use(express.json());

const pool = criarPool();

const produtoModel = criarProdutoModel({ pool });
const produtoService = criarProdutoService({ produtoModel });
const produtoController = criarProdutoController({ produtoService });
const produtoRoutes = criarProdutoRoutes({ produtoController });

const usuarioModel = criarUsuarioModel({ pool });
const usuarioService = criarUsuarioService({ usuarioModel });
const usuarioController = criarUsuarioController({ usuarioService });
const usuarioRoutes = criarUsuarioRoutes({ usuarioController });

const contatoModel = criarContatoModel({ pool });
const contatoService = criarContatoService({ contatoModel });
const contatoController = criarContatoController({ contatoService });
const contatoRoutes = criarContatoRoutes({ contatoController });

app.get('/api/check', (req, res) => {
    res.status(200).json({ status: 'ok', mensagem: 'Servidor funcionando via HTTP!' });
});
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contatos', contatoRoutes);
app.use((req, res) => {
    res.status(404).json({ erro: `A rota ${req.method} ${req.originalUrl} não existe` })
});

app.use((erro, req, res, _next) => {
    console.error('Erro de Sistema: ', erro.message);
    res.status(500).json({ erro: 'Falha interna do servidor' });
});
