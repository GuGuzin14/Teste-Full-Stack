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
  const [sidebarAberto, setSidebarAberto] = useState(false);

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
    setSidebarAberto(false); 
  };

  const toggleSidebar = () => {
    setSidebarAberto(!sidebarAberto);
  };


  if (!usuarioLogado) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  
  return (
    <div className="app-container">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      
      {sidebarAberto && (
        <div className="sidebar-backdrop" onClick={() => setSidebarAberto(false)}></div>
      )}

      <Sidebar 
        usuarioLogado={usuarioLogado}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        paginaAtual={paginaAtual}
        isOpen={sidebarAberto}
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
