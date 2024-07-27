import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./starting.css";
import { MdOutlinePassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      if (response.data.token) {
        navigate("/books");
      } else {
        alert("Wrong password");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 401) {
        alert("Wrong password or email ID");
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="card auth-card">
        <TbLogin2
          style={{
            fontSize: "24px",
            color: "#0E24FE",
            transition: "color 0.3s",
          }}
        />
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <MdEmail
              style={{
                fontSize: "24px",
                color: "#16F4FF",
                transition: "color 0.3s",
              }}
            />
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <MdOutlinePassword
              style={{
                fontSize: "24px",
                color: "#ef4444",
                transition: "color 0.3s",
              }}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't Have an Account?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
