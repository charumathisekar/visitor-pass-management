import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReport(response.data);
      } catch (error) {
        console.error("REPORT ERROR:", error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load report"
        );
      }
    };

    fetchReport();
  }, []);

  if (message) {
    return <p>{message}</p>;
  }

  if (!report) {
    return <p>Loading report...</p>;
  }

  return (
    <div>
      <h1>Visitor Reports</h1>

      <div className="report-grid">
        <div>
          <h2>Total Visitors</h2>
          <p>{report.total}</p>
        </div>

        <div>
          <h2>Pending</h2>
          <p>{report.pending}</p>
        </div>

        <div>
          <h2>Approved</h2>
          <p>{report.approved}</p>
        </div>

        <div>
          <h2>Rejected</h2>
          <p>{report.rejected}</p>
        </div>

        <div>
          <h2>Checked In</h2>
          <p>{report.checkedIn}</p>
        </div>

        <div>
          <h2>Checked Out</h2>
          <p>{report.checkedOut}</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;