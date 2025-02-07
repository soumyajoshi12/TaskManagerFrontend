import React, { useState } from "react";
import { registerUser } from "../../services/todoTaskService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[\W_]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
      return;
    }

    try {
      await registerUser(email, password);
      setSuccess("Registration Successful! Redirecting to task manager...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column bg-black align-items-center gap-4 p-5" style={{ color: "white", width: "100%", minHeight: "100vh" }}>
      <div className="d-flex flex-column">
        <h1>Welcome!</h1>
        <h6>Hello Team, this is my task for the Competency Assessment Round.</h6>
      </div>

      <div className="p-4 rounded" style={{ backgroundColor: "rgba(205, 205, 205, 0.2)", width: "40%" }}>
        <div className="text-center">
          <h3>Sign Up</h3>
          <h6>Sign up and start managing your tasks.</h6>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          </div>

          <div className="d-flex justify-content-end mt-2">
            <a href="/login">Login</a>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button type="submit" className="btn border px-5" style={{ color: "white" }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
