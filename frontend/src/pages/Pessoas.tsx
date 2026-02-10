import { useState, useEffect } from 'react';
import axios from 'axios';
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
        // Atualizar
        await axios.put(`http://localhost:3000/api/pessoas/${pessoaEditando.id}`, formData);
      } else {
        // Criar
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

  const handleDeletar = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta pessoa?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/pessoas/${id}`);
      await carregarPessoas();
    } catch (error) {
      setErro('Erro ao deletar pessoa');
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', telefone: '', cargo: '' });
    setPessoaEditando(null);
    setMostrarForm(false);
  };

  return (
    <div className="pessoas-page">
      <div className="page-header">
        <h1>👥 Gestão de Pessoas</h1>
        <button className="btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? '← Voltar' : '+ Nova Pessoa'}
        </button>
      </div>

      {erro && <div className="erro-message">{erro}</div>}

      {mostrarForm ? (
        <div className="form-container">
          <h2>{pessoaEditando ? 'Editar Pessoa' : 'Nova Pessoa'}</h2>
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
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone:</label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                placeholder="11999999999"
                required
              />
            </div>

            <div className="form-group">
              <label>Cargo:</label>
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
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
                <th>Email</th>
                <th>Telefone</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    Nenhuma pessoa cadastrada. Clique em "Nova Pessoa" para adicionar.
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
                        ✏️
                      </button>
                      <button className="btn-delete" onClick={() => handleDeletar(pessoa.id!)}>
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

export default Pessoas;
