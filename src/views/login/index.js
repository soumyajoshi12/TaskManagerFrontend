import React, { useState } from "react";
import { loginUser } from "../../services/todoTaskService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      window.location.href = "/";
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div
      className="d-flex flex-column bg-black align-items-center gap-4 p-5"
      style={{ color: "white", width: "100%", minHeight: "100vh" }}
    >
      <div className="d-flex flex-column">
        <h1>Welcome!</h1>
        <h6>Hello Team, this is my task for the Competency Assessment Round.</h6>
      </div>

      <div
        className="p-4 rounded"
        style={{ backgroundColor: "rgba(205, 205, 205, 0.2)", width: "40%" }}
      >
        <div className="text-center">
          <h3>Sign In</h3>
          <h6>Sign in and start managing your tasks.</h6>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <div className="d-flex justify-content-end mt-2">
            <a href="/register">Register</a>
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

export default Login;
