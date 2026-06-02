import DashboardLayout from "../../layouts/DashboardLayout";

function BMDashboard() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Branch Manager Dashboard</h2>
        <p>Manage branch operations, staff, inventory and daily performance.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Today&apos;s Orders</h3>
          <p>3</p>
        </div>

        <div className="dashboard-card">
          <h3>Branch Staff</h3>
          <p>6</p>
        </div>

        <div className="dashboard-card">
          <h3>Inventory Items</h3>
          <p>Active</p>
        </div>

        <div className="dashboard-card">
          <h3>Daily Sales</h3>
          <p>£44.97</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Recent Orders</h3>
          <ul>
            <li>Order #1 - Completed</li>
            <li>Order #2 - Preparing</li>
            <li>Order #3 - Pending Payment</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Inventory Status</h3>
          <ul>
            <li>Steak - In Stock</li>
            <li>Chicken - In Stock</li>
            <li>Potatoes - In Stock</li>
            <li>Soft Drinks - In Stock</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Branch Overview</h3>
        <p>This dashboard helps the Branch Manager monitor daily restaurant operations.</p>
      </div>
    </DashboardLayout>
  );
}

export default BMDashboard;