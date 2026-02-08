import express from 'express';
import { 
    criarProduto,
    listarProdutos,
    atualizarProdutos, 
    excluirProdutos 
} from '../controller/controllerProdutos';

const router = express.Router();

router.get('/produtos', listarProdutos);
router.post('/produtos', criarProduto);
router.put('/produtos/:id', atualizarProdutos);
router.delete('/produtos/:id', excluirProdutos);

export default router;