import DashboardLayout from "../../layouts/DashboardLayout";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <p>Manage users, roles, branches and system settings.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Branches</h3>
          <p>7</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>6</p>
        </div>

        <div className="dashboard-card">
          <h3>Roles</h3>
          <p>6</p>
        </div>

        <div className="dashboard-card">
          <h3>System Status</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Recent Users</h3>
          <ul>
            <li>System Administrator</li>
            <li>HQ Manager</li>
            <li>Branch Manager</li>
            <li>Chef User</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Branch Status</h3>
          <ul>
            <li>Steakz London Central - Active</li>
            <li>Steakz Manchester - Active</li>
            <li>Steakz Liverpool - Active</li>
            <li>Steakz Birmingham - Active</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>System Activity</h3>
        <p>All Steakz restaurant management services are operational.</p>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;