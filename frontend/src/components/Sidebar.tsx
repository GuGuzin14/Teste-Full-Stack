import './Sidebar.css';

interface SidebarProps {
  usuarioLogado: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  paginaAtual: string;
}

function Sidebar({ usuarioLogado, onNavigate, onLogout, paginaAtual }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">MgnMgt</h1>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${paginaAtual === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <span className="icon">🏠</span>
          Home
        </button>
        <button 
          className={`nav-item ${paginaAtual === 'pessoas' ? 'active' : ''}`}
          onClick={() => onNavigate('pessoas')}
        >
          <span className="icon">👥</span>
          Pessoas
        </button>
        <button 
          className={`nav-item ${paginaAtual === 'produtos' ? 'active' : ''}`}
          onClick={() => onNavigate('produtos')}
        >
          <span className="icon">📦</span>
          Produtos
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {usuarioLogado.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <span className="user-name">{usuarioLogado.split('@')[0]}</span>
            <span className="user-email">{usuarioLogado}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <span className="icon">🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
