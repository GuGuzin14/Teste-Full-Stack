import express from 'express';
import { 
    criarPessoa, 
    listarPessoas, 
    atualizarPessoas, 
    excluirPessoas 
} from '../controller/controllerPessoas';

const router = express.Router();

router.get('/pessoas', listarPessoas);
router.post('/pessoas', criarPessoa);
router.put('/pessoas/:id', atualizarPessoas);
router.delete('/pessoas/:id', excluirPessoas);

export default router;
