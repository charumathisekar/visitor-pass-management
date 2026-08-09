import { useEffect, useState } from "react";
import { getActivities } from "../services/activityService";

function ActivityHistory() {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getActivities();

        setActivities(data.activities);
      } catch (error) {
        console.error("ACTIVITY ERROR:", error);

        setMessage(
          error.response?.data?.message ||
            "Failed to load activity history"
        );
      }
    };

    loadActivities();
  }, []);

  return (
    <div>
      <h1>Activity History</h1>

      {message && <p>{message}</p>}

      {activities.length === 0 ? (
        <p>No activity found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Description</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.action}</td>

                <td>{activity.description}</td>

                <td>
                  {activity.user?.name || "Unknown"}
                </td>

                <td>
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityHistory;