import { useEffect, useState } from "react";
import { getVisitors } from "../services/visitorService";
import LogoutButton from "../components/LogoutButton";
import {
  getUsers,
  createUser,
  deleteUser,
} from "../services/userService";
function AdminDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [message, setMessage] = useState("");
const [filter, setFilter] = useState("All");
const [search, setSearch] = useState("");
const [users, setUsers] = useState([]);
const [newName, setNewName] = useState("");
const [newEmail, setNewEmail] = useState("");
const [newPassword, setNewPassword] = useState("");
const [newRole, setNewRole] = useState("employee");
  const loadVisitors = async () => {
    try {
      const data = await getVisitors();
      setVisitors(data.visitors);
    } catch (error) {
      console.error("GET VISITORS ERROR:", error);
    }
  };
const handleCreateUser = async (e) => {
  e.preventDefault();

  try {
    const data = await createUser({
      name: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
    });

    console.log("CREATE USER RESPONSE:", data);

    setMessage(data.message);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("employee");

    loadUsers();
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    console.log(
      "SERVER ERROR:",
      error.response?.data
    );

    setMessage(
      error.response?.data?.message ||
        "Failed to create user"
    );
  }
};
const handleDeleteUser = async (id) => {
  try {
    const data = await deleteUser(id);

    setMessage(data.message);

    loadUsers();
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    setMessage(
      error.response?.data?.message ||
        "Failed to delete user"
    );
  }
};
  useEffect(() => {
    loadVisitors();
    loadUsers();
  }, []);
const totalVisitors = visitors.length;

const pendingVisitors = visitors.filter(
  (visitor) => visitor.status === "Pending"
).length;

const approvedVisitors = visitors.filter(
  (visitor) => visitor.status === "Approved"
).length;

const rejectedVisitors = visitors.filter(
  (visitor) => visitor.status === "Rejected"
).length;

const checkedInVisitors = visitors.filter(
  (visitor) => visitor.status === "Checked In"
).length;

const checkedOutVisitors = visitors.filter(
  (visitor) => visitor.status === "Checked Out"
).length;
const loadUsers = async () => {
  try {
    const data = await getUsers();

    setUsers(data.users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
  }
};
 

 

  

 const filteredVisitors = visitors.filter((visitor) => {
  const matchesStatus =
    filter === "All" || visitor.status === filter;

  const searchText = search.toLowerCase();

  const matchesSearch =
    visitor.visitorName
      .toLowerCase()
      .includes(searchText) ||
    visitor.phone.includes(searchText);

  return matchesStatus && matchesSearch;
});
  return (
  <div className="dashboard">

    <div className="dashboard-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Visitor Pass Management</p>
      </div>

      <LogoutButton />
    </div>
    <div className="reports-section">

 

</div>
    <div className="form-card">

  <h2>Create User</h2>

  <form onSubmit={handleCreateUser}>

  <input
    type="text"
    placeholder="Name"
    value={newName}
    onChange={(e) => setNewName(e.target.value)}
    required
  />

  <input
    type="email"
    placeholder="Email"
    value={newEmail}
    onChange={(e) => setNewEmail(e.target.value)}
    required
  />

  <input
    type="password"
    placeholder="Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    required
  />

  <select
    value={newRole}
    onChange={(e) => setNewRole(e.target.value)}
  >
    <option value="employee">
      Employee
    </option>

    <option value="receptionist">
      Receptionist
    </option>

    <option value="admin">
      Admin
    </option>
  </select>

  <button type="submit">
    Create User
  </button>

</form>

</div>
<br></br>
<br></br>
 <h2>Visitor Reports</h2>

  <div className="reports-grid">

    <div className="report-card">
      <h3>Total Visitors</h3>
      <p>{totalVisitors}</p>
    </div>

    <div className="report-card">
      <h3>Pending</h3>
      <p>{pendingVisitors}</p>
    </div>

    <div className="report-card">
      <h3>Approved</h3>
      <p>{approvedVisitors}</p>
    </div>

    <div className="report-card">
      <h3>Rejected</h3>
      <p>{rejectedVisitors}</p>
    </div>

    <div className="report-card">
      <h3>Checked In</h3>
      <p>{checkedInVisitors}</p>
    </div>

    <div className="report-card">
      <h3>Checked Out</h3>
      <p>{checkedOutVisitors}</p>
    </div>

  </div>
<div className="visitor-section">

  <h2>User Management</h2>

  {users.length === 0 ? (
    <p>No users found</p>
  ) : (
    <div className="table-container">

      <table>

        <thead>
          <tr>
  <th>Name</th>
  <th>Email</th>
  <th>Role</th>
  <th>Action</th>
</tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span className="status approved">
                  {user.role}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )}

</div>
    {/* Statistics */}

    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Visitors</h3>
        <p>{totalVisitors}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pendingVisitors}</p>
      </div>

      <div className="stat-card">
        <h3>Approved</h3>
        <p>{approvedVisitors}</p>
      </div>

      <div className="stat-card">
        <h3>Rejected</h3>
        <p>{rejectedVisitors}</p>
      </div>

    </div>

    {/* Visitor List */}

    <div className="visitor-section">

      <h2>Visitor List</h2>

      {/* Search */}

      <input
        className="search-input"
        type="text"
        placeholder="Search visitor by name or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}

      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Pending")}>
          Pending
        </button>

        <button onClick={() => setFilter("Approved")}>
          Approved
        </button>

        <button onClick={() => setFilter("Rejected")}>
          Rejected
        </button>

      </div>

      {/* Table */}

      {filteredVisitors.length === 0 ? (
        <p>No visitors found</p>
      ) : (
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Purpose</th>
                <th>Person To Meet</th>
                <th>Visit Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredVisitors.map((visitor) => (

                <tr key={visitor._id}>

                  <td>{visitor.visitorName}</td>

                  <td>{visitor.phone}</td>

                  <td>{visitor.purpose}</td>

                  <td>{visitor.personToMeet}</td>

                  <td>
                    {new Date(
                      visitor.visitDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`status ${visitor.status.toLowerCase()}`}
                    >
                      {visitor.status}
                    </span>
                  </td>

                </tr>

              ))}
 <tbody>
  {users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>

      <td>{user.email}</td>

      <td>{user.role}</td>

      <td>
        <button
          className="reject-button"
          onClick={() => handleDeleteUser(user._id)}
          disabled={
            user.email ===
            JSON.parse(localStorage.getItem("user"))?.email
          }
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </tbody>

          </table>

        </div>
      )}

    </div>

  </div>
);
}

export default AdminDashboard;