import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      console.log("LOGIN DATA:", data);
      console.log("USER FROM RESPONSE:", data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log(
        "SAVED USER:",
        localStorage.getItem("user")
      );

      setMessage("Login successful");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "receptionist") {
        navigate("/receptionist");
      } else if (data.user.role === "employee") {
        navigate("/employee");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR RESPONSE:", error.response);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    }
  };

return (
  <div className="login-page">
    <div className="login-card">
      <h1>Visitor Pass Management</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      {message && (
        <p className="login-message">
          {message}
        </p>
      )}
    </div>
  </div>
);
}

export default Login;