import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";
import ActivityHistory from "./pages/ActivityHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

<Route
  path="/reports"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Reports />
    </ProtectedRoute>
  }
/>
<Route
  path="/activity-history"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <ActivityHistory />
    </ProtectedRoute>
  }
/>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Receptionist */}
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;