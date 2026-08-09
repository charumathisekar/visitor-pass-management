import { useEffect, useState } from "react";
import {
  getVisitors,
  approveVisitor,
  rejectVisitor,
} from "../services/visitorService";
import LogoutButton from "../components/LogoutButton";

function EmployeeDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [message, setMessage] = useState("");

  const loadVisitors = async () => {
    try {
      const data = await getVisitors();
      setVisitors(data.visitors);
    } catch (error) {
      console.error("GET VISITORS ERROR:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to fetch visitors"
      );
    }
  };
const pendingVisitors = visitors.filter(
  (visitor) => visitor.status === "Pending"
);
  useEffect(() => {
    loadVisitors();
  }, []);

const handleApprove = async (id) => {
  try {
    await approveVisitor(id);
    loadVisitors();
  } catch (error) {
    console.error("APPROVE ERROR:", error);
  }
};

const handleReject = async (id) => {
  try {
    await rejectVisitor(id);
    loadVisitors();
  } catch (error) {
    console.error("REJECT ERROR:", error);
  }
};

 return (
  <div className="dashboard">

    <div className="dashboard-header">
      <div>
        <h1>Employee Dashboard</h1>
        <p>Manage visitor requests</p>
      </div>

      <LogoutButton />
    </div>

    <div className="employee-summary">
      <div className="stat-card">
        <h3>Pending Requests</h3>
        <p>{pendingVisitors.length}</p>
      </div>
    </div>

    <div className="visitor-section">

      <h2>Pending Visitor Requests</h2>

      {pendingVisitors.length === 0 ? (
        <p>No pending visitor requests.</p>
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pendingVisitors.map((visitor) => (
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
                    <span className="status pending">
                      Pending
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="approve-button"
                        onClick={() =>
                          handleApprove(visitor._id)
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-button"
                        onClick={() =>
                          handleReject(visitor._id)
                        }
                      >
                        Reject
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>

  </div>
);
}

export default EmployeeDashboard;