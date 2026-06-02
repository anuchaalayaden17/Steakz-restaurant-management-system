import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: {
    roleName: string;
  };
  branch?: {
    branchName: string;
  };
};

type Role = {
  roleId: number;
  roleName: string;
};

type Branch = {
  branchId: number;
  branchName: string;
};

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: "",
    branchId: "",
  });

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const response = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rolesResponse = await api.get("/admin/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const branchesResponse = await api.get("/admin/branches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(usersResponse.data);
      setRoles(rolesResponse.data);
      setBranches(branchesResponse.data);
    };

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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post(
      "/admin/users",
      {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        roleId: Number(form.roleId),
        branchId: Number(form.branchId),
      },
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
      password: "",
      phoneNumber: "",
      roleId: "",
      branchId: "",
    });

    fetchUsers();
  };

  const handleDeleteUser = async (userId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h2>User Management</h2>
        <p>View and manage Steakz system users.</p>
      </div>

      <div className="dashboard-panel">
        <h3>Create New User</h3>

        <form className="user-form" onSubmit={handleCreateUser}>
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
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />

          <select
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.roleName}
              </option>
            ))}
          </select>

          <select
            name="branchId"
            value={form.branchId}
            onChange={handleChange}
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>

          <button type="submit">Create User</button>
        </form>
      </div>

      <div className="dashboard-panel">
        <h3>Users</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.role.roleName}</td>
                <td>{user.branch?.branchName || "No branch"}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user.userId)}
                    className="delete-btn"
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

export default UserManagement;