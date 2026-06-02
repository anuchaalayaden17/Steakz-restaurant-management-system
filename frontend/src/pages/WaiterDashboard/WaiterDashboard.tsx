import DashboardLayout from "../../layouts/DashboardLayout";

function WaiterDashboard() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Waiter Dashboard</h2>
        <p>Manage tables, customer orders and service requests.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Active Tables</h3>
          <p>8</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>4</p>
        </div>

        <div className="dashboard-card">
          <h3>Ready Orders</h3>
          <p>3</p>
        </div>

        <div className="dashboard-card">
          <h3>Service Requests</h3>
          <p>2</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Table Status</h3>
          <ul>
            <li>Table 1 - Occupied</li>
            <li>Table 2 - Waiting Order</li>
            <li>Table 3 - Served</li>
            <li>Table 4 - Occupied</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Ready Orders</h3>
          <ul>
            <li>Order #101 - Table 1</li>
            <li>Order #102 - Table 3</li>
            <li>Order #103 - Table 5</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Waiter Notes</h3>
        <p>
          Track tables, orders and customer service efficiency.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default WaiterDashboard;