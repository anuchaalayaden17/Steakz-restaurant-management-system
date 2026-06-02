import DashboardLayout from "../../layouts/DashboardLayout";

function ChefDashboard() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Chef Dashboard</h2>
        <p>Manage kitchen operations and food preparation.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>8</p>
        </div>

        <div className="dashboard-card">
          <h3>Preparing</h3>
          <p>4</p>
        </div>

        <div className="dashboard-card">
          <h3>Ready To Serve</h3>
          <p>3</p>
        </div>

        <div className="dashboard-card">
          <h3>Kitchen Status</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Kitchen Queue</h3>
          <ul>
            <li>Table 12 - Ribeye Steak</li>
            <li>Table 5 - Burger Menu</li>
            <li>Table 8 - Grilled Salmon</li>
            <li>Table 3 - Chicken Wings</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Preparation Status</h3>
          <ul>
            <li>Order #101 - Cooking</li>
            <li>Order #102 - Plating</li>
            <li>Order #103 - Waiting Ingredients</li>
            <li>Order #104 - Ready</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Kitchen Notes</h3>
        <p>
          Monitor preparation times, food quality and kitchen workflow.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default ChefDashboard;