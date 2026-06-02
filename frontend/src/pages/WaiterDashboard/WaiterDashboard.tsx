import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function WaiterDashboard() {
  const [tables, setTables] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [form, setForm] = useState({
    tableId: "",
    menuItemId: "",
    quantity: "1",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    const [tablesRes, menuRes, ordersRes] = await Promise.all([
      api.get("/admin/tables", { headers }),
      api.get("/admin/menu-items", { headers }),
      api.get("/admin/orders", { headers }),
    ]);

    setTables(tablesRes.data);
    setMenuItems(menuRes.data);
    setOrders(ordersRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const selectedMenuItem = menuItems.find(
    (item) => item.menuItemId === Number(form.menuItemId)
  );

  const selectedTable = tables.find(
    (table) => table.tableId === Number(form.tableId)
  );

  const estimatedTotal = selectedMenuItem
    ? selectedMenuItem.price * Number(form.quantity || 1)
    : 0;

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const headers = { Authorization: `Bearer ${token}` };

    await api.post(
      "/admin/orders",
      {
        branchId: selectedTable.branchId,
        userId: user.userId,
        tableId: Number(form.tableId),
        orderStatus: "Pending",
        items: [
          {
            menuItemId: Number(form.menuItemId),
            quantity: Number(form.quantity),
          },
        ],
      },
      { headers }
    );

    setForm({
      tableId: "",
      menuItemId: "",
      quantity: "1",
    });

    fetchData();
  };

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  );

  const readyOrders = orders.filter(
    (order) => order.orderStatus === "Ready"
  );

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Waiter POS</h2>
        <p>Create customer orders and send them to the kitchen.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Tables</h3>
          <p>{tables.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Ready Orders</h3>
          <p>{readyOrders.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Status</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Create Order</h3>

        <form className="user-form" onSubmit={handleCreateOrder}>
          <select
            name="tableId"
            value={form.tableId}
            onChange={handleChange}
            required
          >
            <option value="">Select Table</option>
            {tables.map((table) => (
              <option key={table.tableId} value={table.tableId}>
                Table {table.tableNumber} - {table.status}
              </option>
            ))}
          </select>

          <select
            name="menuItemId"
            value={form.menuItemId}
            onChange={handleChange}
            required
          >
            <option value="">Select Menu Item</option>
            {menuItems.map((item) => (
              <option key={item.menuItemId} value={item.menuItemId}>
                {item.itemName} - £{item.price}
              </option>
            ))}
          </select>

          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <div className="order-total-box">
            Total: £{estimatedTotal.toFixed(2)}
          </div>

          <button type="submit">Send Order to Kitchen</button>
        </form>
      </div>

      <div className="dashboard-panel">
        <h3>My Restaurant Orders</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Table</th>
              <th>Items</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>
                <td>Table {order.table.tableNumber}</td>
                <td>
                  {order.orderItems.map((item: any) => (
                    <div key={item.orderItemId}>
                      {item.quantity}x {item.menuItem.itemName}
                    </div>
                  ))}
                </td>
                <td>{order.orderStatus}</td>
                <td>£{order.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default WaiterDashboard;