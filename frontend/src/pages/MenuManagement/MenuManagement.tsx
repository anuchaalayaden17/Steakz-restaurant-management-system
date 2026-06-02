import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

type MenuItem = {
  menuItemId: number;
  itemName: string;
  description: string;
  price: number;
  category: string;
  availabilityStatus: string;
};

function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    availabilityStatus: "Available",
  });

  const token = localStorage.getItem("token");

  const fetchMenuItems = async () => {
    const response = await api.get("/admin/menu-items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMenuItems(response.data);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post(
      "/admin/menu-items",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm({
      itemName: "",
      description: "",
      price: "",
      category: "",
      availabilityStatus: "Available",
    });

    fetchMenuItems();
  };

  const handleDelete = async (menuItemId: number) => {
    if (!window.confirm("Delete this menu item?")) return;

    await api.delete(`/admin/menu-items/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchMenuItems();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Menu Management</h2>
        <p>Manage Steakz restaurant menu items.</p>
      </div>

      <div className="dashboard-panel">
        <h3>Add Menu Item</h3>

        <form className="user-form" onSubmit={handleCreateMenuItem}>
          <input
            name="itemName"
            placeholder="Item Name"
            value={form.itemName}
            onChange={handleChange}
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <select
            name="availabilityStatus"
            value={form.availabilityStatus}
            onChange={handleChange}
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>

          <button type="submit">Add Menu Item</button>
        </form>
      </div>

      <div className="dashboard-panel">
        <h3>Menu Items</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.map((item) => (
              <tr key={item.menuItemId}>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>£{item.price}</td>
                <td>{item.availabilityStatus}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.menuItemId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default MenuManagement;