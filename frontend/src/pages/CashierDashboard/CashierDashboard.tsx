import DashboardLayout from "../../layouts/DashboardLayout";

function CashierDashboard() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Cashier Dashboard</h2>
        <p>Manage payments, transactions and daily revenue.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Today's Sales</h3>
          <p>£44.97</p>
        </div>

        <div className="dashboard-card">
          <h3>Transactions</h3>
          <p>3</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Bills</h3>
          <p>1</p>
        </div>

        <div className="dashboard-card">
          <h3>Status</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Recent Transactions</h3>
          <ul>
            <li>Order #1 - £12.99</li>
            <li>Order #2 - £18.99</li>
            <li>Order #3 - £12.99</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Payment Methods</h3>
          <ul>
            <li>Card Payments - 2</li>
            <li>Cash Payments - 1</li>
            <li>Online Payments - 0</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Cashier Notes</h3>
        <p>
          Monitor revenue, payment processing and customer billing.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default CashierDashboard;