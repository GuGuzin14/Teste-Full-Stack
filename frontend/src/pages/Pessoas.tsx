import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import './Pessoas.css';

interface Pessoa {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
}

function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [pessoaParaDeletar, setPessoaParaDeletar] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Pessoa>({
    nome: '',
    email: '',
    telefone: '',
    cargo: ''
  });

  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pessoas');
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
      setErro('Erro ao carregar pessoas');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      if (pessoaEditando) {
        await axios.put(`http://localhost:3000/api/pessoas/${pessoaEditando.id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/pessoas', formData);
      }
      
      await carregarPessoas();
      resetForm();
    } catch (error: any) {
      setErro(error.response?.data?.error || 'Erro ao salvar pessoa');
    } finally {
      setCarregando(false);
    }
  };

  const handleEditar = (pessoa: Pessoa) => {
    setPessoaEditando(pessoa);
    setFormData({
      nome: pessoa.nome,
      email: pessoa.email,
      telefone: pessoa.telefone,
      cargo: pessoa.cargo
    });
    setMostrarForm(true);
  };

  const handleDeletar = (id: number) => {
    setPessoaParaDeletar(id);
    setModalAberto(true);
  };

  const confirmarDelecao = async () => {
    if (!pessoaParaDeletar) return;

    try {
      await axios.delete(`http://localhost:3000/api/pessoas/${pessoaParaDeletar}`);
      await carregarPessoas();
      setModalAberto(false);
      setPessoaParaDeletar(null);
    } catch (error) {
      setErro('Erro ao deletar pessoa');
      setModalAberto(false);
    }
  };

  const cancelarDelecao = () => {
    setModalAberto(false);
    setPessoaParaDeletar(null);
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', telefone: '', cargo: '' });
    setPessoaEditando(null);
    setMostrarForm(false);
  };

  return (
    <div className="pessoas-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1>People</h1>
          <span className="page-subtitle">Manage your team members</span>
        </div>
        <button className="btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? '← Back' : '+ New Person'}
        </button>
      </div>

      {erro && <div className="error-message">{erro}</div>}

      {mostrarForm ? (
        <div className="form-container">
          <h2>{pessoaEditando ? 'Edit Person' : 'New Person'}</h2>
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
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder='gustavo@example.com'
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                placeholder="11999999999"
                maxLength={15}
                required
              />
            </div>

            <div className="form-group">
              <label>Position:</label>
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                required
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
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No people registered. Click "New Person" to add.
                  </td>
                </tr>
              ) : (
                pessoas.map((pessoa) => (
                  <tr key={pessoa.id}>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.email}</td>
                    <td>{pessoa.telefone}</td>
                    <td>{pessoa.cargo}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEditar(pessoa)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDeletar(pessoa.id!)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        
          <div className="mobile-list">
            {pessoas.length === 0 ? (
              <div className="empty-state-mobile">
                No people registered. Click "New Person" to add.
              </div>
            ) : (
              pessoas.map((pessoa) => (
                <div key={pessoa.id} className="mobile-card">
                  <div className="mobile-card-header">
                    <h3>{pessoa.nome}</h3>
                    <span className="mobile-badge">{pessoa.cargo}</span>
                  </div>
                  <div className="mobile-card-body">
                    <div className="mobile-info">
                      <span className="mobile-label">Email:</span>
                      <span className="mobile-value">{pessoa.email}</span>
                    </div>
                    <div className="mobile-info">
                      <span className="mobile-label">Phone:</span>
                      <span className="mobile-value">{pessoa.telefone}</span>
                    </div>
                  </div>
                  <div className="mobile-card-actions">
                    <button className="btn-edit" onClick={() => handleEditar(pessoa)}>
                      ✏️ Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeletar(pessoa.id!)}>
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
        message="Are you sure you want to delete this person? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Pessoas;
