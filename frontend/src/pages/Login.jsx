import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";
import bg from "../assets/login.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      const token = res.data.token;
      const role = res.data.user.role;

      localStorage.setItem("token", token);

      if (role === "student") navigate("/dashboard");
      if (role === "recruiter") navigate("/recruiter-dashboard");
      if (role === "admin") navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left" style={{ backgroundImage: `url(${bg})` }}>
        <div className="left-overlay"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back!</h2>

          <p className="subtitle">
            Log in to start creating stunning videos with ease.
          </p>

          <form onSubmit={handleLogin}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn">Login</button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <button className="google-btn">Continue with Google</button>

          <p className="signup">
            Don't have an account?
            <span onClick={() => navigate("/register")}>Sign up here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
