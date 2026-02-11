import './Sidebar.css';

interface SidebarProps {
  usuarioLogado: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  paginaAtual: string;
  isOpen: boolean;
}

function Sidebar({ usuarioLogado, onNavigate, onLogout, paginaAtual, isOpen }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">MgnMgt</h1>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${paginaAtual === 'pessoas' ? 'active' : ''}`}
          onClick={() => onNavigate('pessoas')}
        >
          <span className="icon">👤</span>
          People
        </button>
        <button 
          className={`nav-item ${paginaAtual === 'produtos' ? 'active' : ''}`}
          onClick={() => onNavigate('produtos')}
        >
          <span className="icon">📦</span>
          Products
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {usuarioLogado.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <span className="user-label">Signed in as</span>
            <span className="user-email">{usuarioLogado}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <span className="logout-icon">⏻</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
