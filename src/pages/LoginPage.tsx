import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState<{
    token: string;
    email: string;
    userType: string;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      console.log("Response data:", response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("Errore durante il Login!", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 border rounded shadow bg-white text-center"
        style={{ width: "350px" }}
      >
        <h2 className="mb-4">Login Page</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Bottoni Login e Register con spazio tra loro */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-primary btn-lg" type="submit">
              Login
            </button>
            <Link to="/register">
              <button className="btn btn-secondary btn-lg" type="button">
                Register
              </button>
            </Link>
          </div>
        </form>
        {/* Messaggio di login avvenuto con successo */}
        {responseData && (
          <div className="mt-4 alert alert-success">
            <h5>Login Successful</h5>
            <p>
              <strong>Token:</strong> {responseData.token}
            </p>
            <p>
              <strong>Email:</strong> {responseData.email}
            </p>
            <p>
              <strong>User Type:</strong> {responseData.userType}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
