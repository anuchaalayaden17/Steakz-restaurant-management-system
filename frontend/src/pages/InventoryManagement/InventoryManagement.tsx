import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function InventoryManagement() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);

  const [form, setForm] = useState({
    ingredientName: "",
    quantityInStock: "",
    unit: "",
    branchId: "",
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const inventoryResponse = await api.get("/admin/inventory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const branchResponse = await api.get("/admin/branches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setInventory(inventoryResponse.data);
    setBranches(branchResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/admin/inventory", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm({
      ingredientName: "",
      quantityInStock: "",
      unit: "",
      branchId: "",
    });

    fetchData();
  };

  const handleDelete = async (inventoryId: number) => {
    if (!window.confirm("Delete this ingredient?")) return;

    await api.delete(`/admin/inventory/${inventoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchData();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Inventory Management</h2>
        <p>Manage restaurant stock and ingredients.</p>
      </div>

      <div className="dashboard-panel">
        <h3>Add Ingredient</h3>

        <form className="user-form" onSubmit={handleCreate}>
          <input
            name="ingredientName"
            placeholder="Ingredient Name"
            value={form.ingredientName}
            onChange={handleChange}
            required
          />

          <input
            name="quantityInStock"
            type="number"
            placeholder="Quantity"
            value={form.quantityInStock}
            onChange={handleChange}
            required
          />

          <input
            name="unit"
            placeholder="Unit (kg, litres, pcs)"
            value={form.unit}
            onChange={handleChange}
            required
          />

          <select
            name="branchId"
            value={form.branchId}
            onChange={handleChange}
            required
          >
            <option value="">Select Branch</option>

            {branches.map((branch) => (
              <option
                key={branch.branchId}
                value={branch.branchId}
              >
                {branch.branchName}
              </option>
            ))}
          </select>

          <button type="submit">
            Add Ingredient
          </button>
        </form>
      </div>

      <div className="dashboard-panel">
        <h3>Inventory</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Stock</th>
              <th>Unit</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => (
              <tr key={item.inventoryId}>
                <td>{item.ingredientName}</td>
                <td>{item.quantityInStock}</td>
                <td>{item.unit}</td>
                <td>{item.branch.branchName}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item.inventoryId)
                    }
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

export default InventoryManagement;