import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function TableManagement() {
  const [tables, setTables] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);

  const [form, setForm] = useState({
    tableNumber: "",
    capacity: "",
    status: "Available",
    branchId: "",
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const tablesResponse = await api.get("/admin/tables", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const branchesResponse = await api.get("/admin/branches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTables(tablesResponse.data);
    setBranches(branchesResponse.data);
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

    await api.post("/admin/tables", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm({
      tableNumber: "",
      capacity: "",
      status: "Available",
      branchId: "",
    });

    fetchData();
  };

  const handleDelete = async (tableId: number) => {
    if (!window.confirm("Delete this table?")) return;

    await api.delete(`/admin/tables/${tableId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchData();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Table Management</h2>
        <p>Manage restaurant tables and seating.</p>
      </div>

      <div className="dashboard-panel">
        <h3>Add Table</h3>

        <form className="user-form" onSubmit={handleCreate}>
          <input
            name="tableNumber"
            placeholder="Table Number"
            value={form.tableNumber}
            onChange={handleChange}
            required
          />

          <input
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Available</option>
            <option>Occupied</option>
            <option>Reserved</option>
          </select>

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
            Add Table
          </button>
        </form>
      </div>

      <div className="dashboard-panel">
        <h3>Restaurant Tables</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Table</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tables.map((table) => (
              <tr key={table.tableId}>
                <td>{table.tableNumber}</td>
                <td>{table.capacity}</td>
                <td>{table.status}</td>
                <td>{table.branch.branchName}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(table.tableId)
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

export default TableManagement;