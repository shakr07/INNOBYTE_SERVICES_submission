import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./starting.css";
import { FcPortraitMode, FcSignature } from "react-icons/fc";
import { MdOutlinePassword, MdEmail } from "react-icons/md";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 420) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="card auth-card">
        <FcPortraitMode
          style={{ fontSize: "24px", transition: "color 0.3s" }}
        />
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FcSignature
              style={{ fontSize: "24px", transition: "color 0.3s" }}
            />
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <MdEmail
              style={{
                fontSize: "24px",
                color: "#16F4FF",
                cursor: "pointer",
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
                cursor: "pointer",
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
            Register
          </button>
        </form>
        <p className="mt-3 text-center">
          Already Have an Account?{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Registration;
``;
