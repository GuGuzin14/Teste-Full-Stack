import { useState } from 'react';
import Login from './pages/Login';
import './App.css';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);

  const handleLoginSuccess = (usuario: string) => {
    setUsuarioLogado(usuario);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
  };

  // Se não estiver logado, mostra a tela de login
  if (!usuarioLogado) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Se estiver logado, mostra a aplicação principal
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bem-vindo, {usuarioLogado}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </header>
      
      <main className="app-content">
        <div className="welcome-box">
          <h2>🎉 Login realizado com sucesso!</h2>
          <p>Você está dentro da aplicação.</p>
          <p className="info">Aqui você pode adicionar suas páginas de Pessoas, Produtos, etc.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
