import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/appwrite";
import { AuthContext } from "../../AuthContext";
import Input from "../../Input";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const session = await authService.createAccount({
        email,
        password,
        userName,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setEmail("");
      setUserName("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="center-container">
        <div className="form-container">
          <h2>Register</h2>
          <form>
            <Input
              label="User Name"
              type="name"
              id="name"
              value={userName}
              placeholder="Enter your full Name"
              onChange={(e) => setUserName(e.target.value)}
              required
            ></Input>

            <Input
              label="email"
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Input>

            <Input
              label="password"
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Input>
            <button
              type="submit"
              className="btn-submit"
              onClick={handleRegisterUser}
            >
              Submit
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
export default Register;
