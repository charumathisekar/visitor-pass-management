import { useEffect, useState } from "react";
import {
  registerVisitor,
  getVisitors,
  checkInVisitor,
  checkOutVisitor,
} from "../services/visitorService";

import LogoutButton from "../components/LogoutButton";

function ReceptionistDashboard() {
  const [visitorName, setVisitorName] = useState("");
const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [personToMeet, setPersonToMeet] = useState("");
  const [visitDate, setVisitDate] = useState("");
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
  const [visitors, setVisitors] = useState([]);
  const [message, setMessage] = useState("");

  // Get visitors
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

  useEffect(() => {
    loadVisitors();
  }, []);

  // Register visitor
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (visitorName.trim().length < 2) {
      setMessage(
        "Visitor name must be at least 2 characters"
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage(
        "Phone number must be exactly 10 digits"
      );
      return;
    }

    if (purpose.trim().length < 2) {
      setMessage("Please enter a valid purpose");
      return;
    }

    if (personToMeet.trim().length < 2) {
      setMessage(
        "Please enter the person to meet"
      );
      return;
    }

    if (!visitDate) {
      setMessage("Please select a visit date");
      return;
    }

    try {
      const data = await registerVisitor({
        visitorName,
        phone,
        purpose,
        personToMeet,
        visitDate,
      });

      setMessage(data.message);

      setVisitorName("");
      setPhone("");
      setPurpose("");
      setPersonToMeet("");
      setVisitDate("");

      loadVisitors();
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to register visitor"
      );
    }
  };

  // Check In
  const handleCheckIn = async (id) => {
    try {
      const data = await checkInVisitor(id);

      setMessage(data.message);

      loadVisitors();
    } catch (error) {
      console.error("CHECK IN ERROR:", error);

      setMessage(
        error.response?.data?.message ||
          "Check in failed"
      );
    }
  };
 const handleCheckOut = async (id) => {
  try {
    const data = await checkOutVisitor(id);

    setMessage(data.message);

    loadVisitors();
  } catch (error) {
    console.error("CHECK OUT ERROR:", error);

    setMessage(
      error.response?.data?.message ||
        "Check out failed"
    );
  }
};
const filteredVisitors = visitors.filter((visitor) => {
  const matchesSearch = visitor.visitorName
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    visitor.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">
        <div>
          <h1>Receptionist Dashboard</h1>
          <p>Register and track visitors</p>
        </div>

        <LogoutButton />
      </div>

      <div className="receptionist-grid">

        {/* Registration Form */}

        <div className="form-card">

          <h2>Register Visitor</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Visitor Name</label>

              <input
                type="text"
                value={visitorName}
                onChange={(e) =>
                  setVisitorName(e.target.value)
                }
                placeholder="Enter visitor name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter 10 digit phone"
                required
              />
            </div>

            <div className="form-group">
              <label>Purpose</label>

              <input
                type="text"
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
                placeholder="Enter purpose"
                required
              />
            </div>

            <div className="form-group">
              <label>Person To Meet</label>

              <input
                type="text"
                value={personToMeet}
                onChange={(e) =>
                  setPersonToMeet(e.target.value)
                }
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="form-group">
              <label>Visit Date</label>

              <input
                type="date"
                value={visitDate}
                onChange={(e) =>
                  setVisitDate(e.target.value)
                }
                required
              />
            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Register Visitor
            </button>

          </form>

          {message && (
            <p className="form-message">
              {message}
            </p>
          )}

        </div>

        {/* Visitor List */}

        <div className="visitor-section">

          <h2>Visitor List</h2>
<div className="visitor-filters">

  <input
    type="text"
    className="search-input"
    placeholder="Search by visitor name or phone"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
    <option value="Checked In">Checked In</option>
    <option value="Checked Out">Checked Out</option>
  </select>

</div>
<input
  type="text"
  placeholder="Search visitor..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
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
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredVisitors.map((visitor) => (

                    <tr key={visitor._id}>

                      <td>
                        {visitor.visitorName}
                      </td>

                      <td>
                        {visitor.phone}
                      </td>

                      <td>
                        {visitor.purpose}
                      </td>

                      <td>
                        {visitor.personToMeet}
                      </td>

                      <td>
                        {new Date(
                          visitor.visitDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
  <span
    className={`status ${visitor.status
      .toLowerCase()
      .replace(" ", "-")}`}
  >
    {visitor.status}
  </span>
</td>

<td>
  {visitor.status === "Approved" && (
    <button
      onClick={() => handleCheckIn(visitor._id)}
    >
      Check In
    </button>
  )}

  {visitor.status === "Checked In" && (
    <button
      onClick={() => handleCheckOut(visitor._id)}
    >
      Check Out
    </button>
  )}

  {visitor.status === "Pending" && (
    <span>Waiting for approval</span>
  )}

  {visitor.status === "Rejected" && (
    <span>No action</span>
  )}

  {visitor.status === "Checked Out" && (
    <span>No action</span>
  )}
</td>

                      <td>

                        {visitor.status ===
                          "Approved" && (

                          <button
                            className="approve-button"
                            onClick={() =>
                              handleCheckIn(
                                visitor._id
                              )
                            }
                          >
                            Check In
                          </button>

                        )}

                        

                        {visitor.status ===
                          "Pending" && (
                          <span>
                            Waiting for approval
                          </span>
                        )}

                        {visitor.status ===
                          "Rejected" && (
                          <span>
                            Rejected
                          </span>
                        )}

                        {visitor.status ===
                          "Checked Out" && (
                          <span>
                            Checked Out
                          </span>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ReceptionistDashboard;