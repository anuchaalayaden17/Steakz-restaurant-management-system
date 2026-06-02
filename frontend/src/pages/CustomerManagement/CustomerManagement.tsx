import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const token = localStorage.getItem("token");

  const fetchCustomers = async () => {
    const response = await api.get("/admin/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCustomers(response.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await api.post(
      "/admin/customers",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });

    fetchCustomers();
  };

  const handleDelete = async (
    customerId: number
  ) => {
    if (!window.confirm("Delete customer?"))
      return;

    await api.delete(
      `/admin/customers/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCustomers();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>Customer Management</h2>
        <p>
          Manage Steakz restaurant customers.
        </p>
      </div>

      <div className="dashboard-panel">
        <h3>Add Customer</h3>

        <form
          className="user-form"
          onSubmit={handleCreate}
        >
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />

          <button type="submit">
            Add Customer
          </button>
        </form>
      </div>

      <div className="dashboard-panel">
        <h3>Customers</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>
                  {customer.firstName}{" "}
                  {customer.lastName}
                </td>

                <td>{customer.email}</td>

                <td>
                  {customer.phoneNumber}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        customer.customerId
                      )
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

export default CustomerManagement;