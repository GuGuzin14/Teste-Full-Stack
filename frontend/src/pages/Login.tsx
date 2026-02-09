import { useState } from 'react';
import axios from 'axios';
import './Login.css';

interface LoginProps {
  onLoginSuccess: (usuario: string) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        senha
      });

      if (response.data.sucesso) {
        onLoginSuccess(response.data.usuario);
      }
    } catch (error: any) {
      if (error.response) {
        setErro(error.response.data.erro || 'Erro ao fazer login');
      } else {
        setErro('Erro ao conectar com o servidor');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>MgnMgt</h2>
        <p className="subtitle">Manage people and products with ease</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Password</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {erro && <div className="erro">{erro}</div>}

          <button type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Sign In'}
          </button>
        </form>
        <div className="footer">
          <h6>Demo credentials: </h6>
          <p>Email: <b>demo@example.com</b></p>
          <p>Password: <b>password</b></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
