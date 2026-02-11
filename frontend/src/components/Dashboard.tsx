import './Dashboard.css';

interface DashboardProps {
  usuarioLogado: string;
  onNavigate: (page: string) => void;
}

function Dashboard({ usuarioLogado, onNavigate }: DashboardProps) {
  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Welcome to MgnMgt</h1>
        <p>Hello, <strong>{usuarioLogado.split('@')[0]}</strong>! Manage people and products efficiently.</p>
      </div>

      <div className="cards-container">
        <div className="dashboard-card pessoas" onClick={() => onNavigate('pessoas')}>
          <div className="card-icon">👥</div>
          <h2>People</h2>
          <p>Manage people information</p>
          <button className="card-button">Access →</button>
        </div>

        <div className="dashboard-card produtos" onClick={() => onNavigate('produtos')}>
          <div className="card-icon">📦</div>
          <h2>Products</h2>
          <p>Manage your product inventory</p>
          <button className="card-button">Access →</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
