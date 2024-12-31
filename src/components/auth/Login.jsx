import "../css/auth/auth.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/appwrite";
import { AuthContext } from "../../AuthContext";
import Input from "../../Input";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setEmail("");
      setPassword("");
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="center-container">
        <div className="form-container">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              {/* <Input
                label="email"
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Input> */}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-submit"
              onClick={handleLoginUser}
            >
              Submit
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </>
  );
}
export default Login;
