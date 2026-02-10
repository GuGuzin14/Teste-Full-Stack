import express, {Request, Response} from 'express';
import cors from 'cors';
import pessoasRoutes from './routes/routesPessoas';
import produtosRoutes from './routes/routesProdutos';
import authRoutes from './routes/routesAuth';

const app = express();
const port = 3000;

// Configurar CORS para aceitar requisições do frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL do frontend Vite
  credentials: true
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor rodando');
});

app.use('/api', authRoutes);
app.use('/api', pessoasRoutes);
app.use('/api', produtosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});