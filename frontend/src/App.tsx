import { useState } from 'react';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pessoas from './pages/Pessoas';
import Produtos from './pages/Produtos';
import './App.css';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<string>('home');

  const handleLoginSuccess = (usuario: string) => {
    setUsuarioLogado(usuario);
    setPaginaAtual('home');
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setPaginaAtual('home');
  };

  const handleNavigate = (page: string) => {
    setPaginaAtual(page);
  };

  // Se não estiver logado, mostra a tela de login
  if (!usuarioLogado) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Se estiver logado, mostra o dashboard com sidebar
  return (
    <div className="app-container">
      <Sidebar 
        usuarioLogado={usuarioLogado}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        paginaAtual={paginaAtual}
      />
      
      <main className="main-content">
        {paginaAtual === 'home' && (
          <Dashboard usuarioLogado={usuarioLogado} onNavigate={handleNavigate} />
        )}
        {paginaAtual === 'pessoas' && <Pessoas />}
        {paginaAtual === 'produtos' && <Produtos />}
      </main>
    </div>
  );
}

export default App;
