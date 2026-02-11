import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import './Produtos.css';

interface Produto {
  id?: number;
  nome: string;
  sku: number;
  preco: number;
  quantidade: number;
  categoria: string;
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoParaDeletar, setProdutoParaDeletar] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Produto>({
    nome: '',
    sku: 0,
    preco: 0,
    quantidade: 0,
    categoria: ''
  });

  const formatPrice = (preco: number | null | undefined): string => {
    const price = Number(preco) || 0;
    return price.toFixed(2);
  };

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
      
        await axios.put(`http://localhost:3000/api/produtos/${produtoEditando.id}`, formData);
      } else {
        
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
      sku: produto.sku,
      preco: produto.preco,
      quantidade: produto.quantidade,
      categoria: produto.categoria
    });
    setMostrarForm(true);
  };

  const handleDeletar = (id: number) => {
    setProdutoParaDeletar(id);
    setModalAberto(true);
  };

  const confirmarDelecao = async () => {
    if (!produtoParaDeletar) return;

    try {
      await axios.delete(`http://localhost:3000/api/produtos/${produtoParaDeletar}`);
      await carregarProdutos();
      setModalAberto(false);
      setProdutoParaDeletar(null);
    } catch (error) {
      setErro('Error deleting product');
      setModalAberto(false);
    }
  };

  const cancelarDelecao = () => {
    setModalAberto(false);
    setProdutoParaDeletar(null);
  };

  const resetForm = () => {
    setFormData({ nome: '', sku: 0, preco: 0, quantidade: 0, categoria: '' });
    setProdutoEditando(null);
    setMostrarForm(false);
  };

  return (
    <div className="produtos-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1>Products</h1>
          <span className="page-subtitle">Manage your inventory</span>
        </div>
        <button className="btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? '← Back' : '+ New Product'}
        </button>
      </div>

      {erro && <div className="error-message">{erro}</div>}

      {mostrarForm ? (
        <div className="form-container">
          <h2>{produtoEditando ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required 
                placeholder='Gustavo'
              />
            </div>

            <div className="form-group">
              <label>SKU:</label>
              <input
                type="number"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: parseInt(e.target.value) || 0})}
                required
                placeholder='12345'
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: parseFloat(e.target.value) || 0})}
                  required
                  placeholder='99.99'
                />
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({...formData, quantidade: parseInt(e.target.value) || 0})}
                  required
                  placeholder='10'
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                required
                placeholder='Electronics'
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={carregando}>
                {carregando ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-container">
          <table className="desktop-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No products registered. Click "New Product" to add.
                  </td>
                </tr>
              ) : (
                produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.sku}</td>
                    <td>R$ {formatPrice(produto.preco)}</td>
                    <td>{produto.quantidade}</td>
                    <td>{produto.categoria}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEditar(produto)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDeletar(produto.id!)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

      
          <div className="mobile-list">
            {produtos.length === 0 ? (
              <div className="empty-state-mobile">
                No products registered. Click "New Product" to add.
              </div>
            ) : (
              produtos.map((produto) => (
                <div key={produto.id} className="mobile-card">
                  <div className="mobile-card-header">
                    <h3>{produto.nome}</h3>
                    <span className="mobile-badge">{produto.categoria}</span>
                  </div>
                  <div className="mobile-card-body">
                    <div className="mobile-info">
                      <span className="mobile-label">SKU:</span>
                      <span className="mobile-value">{produto.sku}</span>
                    </div>
                    <div className="mobile-info">
                      <span className="mobile-label">Price:</span>
                      <span className="mobile-value">R$ {formatPrice(produto.preco)}</span>
                    </div>
                    <div className="mobile-info">
                      <span className="mobile-label">Quantity:</span>
                      <span className="mobile-value">{produto.quantidade}</span>
                    </div>
                  </div>
                  <div className="mobile-card-actions">
                    <button className="btn-edit" onClick={() => handleEditar(produto)}>
                      ✏️ Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeletar(produto.id!)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalAberto}
        onClose={cancelarDelecao}
        onConfirm={confirmarDelecao}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Produtos;
