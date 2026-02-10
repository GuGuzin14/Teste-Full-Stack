import './Dashboard.css';

interface DashboardProps {
  usuarioLogado: string;
  onNavigate: (page: string) => void;
}

function Dashboard({ usuarioLogado, onNavigate }: DashboardProps) {
  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Bem-vindo ao MgnMgt! 👋</h1>
        <p>Olá, <strong>{usuarioLogado.split('@')[0]}</strong>! Gerencie pessoas e produtos com facilidade.</p>
      </div>

      <div className="cards-container">
        <div className="dashboard-card pessoas" onClick={() => onNavigate('pessoas')}>
          <div className="card-icon">👥</div>
          <h2>Pessoas</h2>
          <p>Gerencie informações de pessoas</p>
          <button className="card-button">Acessar →</button>
        </div>

        <div className="dashboard-card produtos" onClick={() => onNavigate('produtos')}>
          <div className="card-icon">📦</div>
          <h2>Produtos</h2>
          <p>Gerencie seu inventário de produtos</p>
          <button className="card-button">Acessar →</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
