import { useState, useEffect } from 'react';
import axios from 'axios';
import './Produtos.css';

interface Produto {
  id?: number;
  nome: string;
  kfu: number;
  quantidade: number;
  categoria: string;
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  
  const [formData, setFormData] = useState<Produto>({
    nome: '',
    kfu: 0,
    quantidade: 0,
    categoria: ''
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setErro('Erro ao carregar produtos');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      if (produtoEditando) {
        // Atualizar
        await axios.put(`http://localhost:3000/api/produtos/${produtoEditando.id}`, formData);
      } else {
        // Criar
        await axios.post('http://localhost:3000/api/produtos', formData);
      }
      
      await carregarProdutos();
      resetForm();
    } catch (error: any) {
      setErro(error.response?.data?.error || 'Erro ao salvar produto');
    } finally {
      setCarregando(false);
    }
  };

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setFormData({
      nome: produto.nome,
      kfu: produto.kfu,
      quantidade: produto.quantidade,
      categoria: produto.categoria
    });
    setMostrarForm(true);
  };

  const handleDeletar = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/produtos/${id}`);
      await carregarProdutos();
    } catch (error) {
      setErro('Erro ao deletar produto');
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', kfu: 0, quantidade: 0, categoria: '' });
    setProdutoEditando(null);
    setMostrarForm(false);
  };

  return (
    <div className="produtos-page">
      <div className="page-header">
        <h1>📦 Gestão de Produtos</h1>
        <button className="btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? '← Voltar' : '+ Novo Produto'}
        </button>
      </div>

      {erro && <div className="erro-message">{erro}</div>}

      {mostrarForm ? (
        <div className="form-container">
          <h2>{produtoEditando ? 'Editar Produto' : 'Novo Produto'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>SKU/KFU:</label>
              <input
                type="number"
                value={formData.kfu}
                onChange={(e) => setFormData({...formData, kfu: parseInt(e.target.value)})}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantidade:</label>
              <input
                type="number"
                value={formData.quantidade}
                onChange={(e) => setFormData({...formData, quantidade: parseInt(e.target.value)})}
                required
              />
            </div>

            <div className="form-group">
              <label>Categoria:</label>
              <input
                type="text"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={carregando}>
                {carregando ? 'Salvando...' : 'Salvar'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    Nenhum produto cadastrado. Clique em "Novo Produto" para adicionar.
                  </td>
                </tr>
              ) : (
                produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.kfu}</td>
                    <td>{produto.quantidade}</td>
                    <td>{produto.categoria}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEditar(produto)}>
                        ✏️
                      </button>
                      <button className="btn-delete" onClick={() => handleDeletar(produto.id!)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Produtos;
