import DashboardLayout from "../../layouts/DashboardLayout";

function HMDashboard() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>HQ Manager Dashboard</h2>
        <p>Monitor all Steakz branches, performance and reports.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Branches</h3>
          <p>7</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Staff</h3>
          <p>6</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p>£44.97</p>
        </div>

        <div className="dashboard-card">
          <h3>Reports</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Branch Performance</h3>
          <ul>
            <li>Steakz London Central - High Performance</li>
            <li>Steakz Manchester - Stable</li>
            <li>Steakz Liverpool - Stable</li>
            <li>Steakz Birmingham - Active</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Management Reports</h3>
          <ul>
            <li>Daily sales summary available</li>
            <li>Branch comparison report available</li>
            <li>Staff overview report available</li>
            <li>Inventory monitoring report available</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>HQ Overview</h3>
        <p>
          Headquarters can monitor all Steakz branches, compare performance and
          support management decisions.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default HMDashboard;