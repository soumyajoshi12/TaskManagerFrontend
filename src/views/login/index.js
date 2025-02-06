import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="d-flex flex-column bg-black align-items-center gap-4 p-5"
      style={{ color: "white", width: "100%", minHeight: "100vh" }}
    >
      <div className="d-flex flex-column">
        <h1>Welcome!</h1>
        <h6>
          Hello Team, this is my task for the Competency Assessment Round.
        </h6>
      </div>

      <div
        className="p-4 rounded"
        style={{ backgroundColor: "rgba(205, 205, 205, 0.2)", width: "40%" }}
      >
        <div className="text-center">
          <h3>Sign In</h3>
          <h6>Sign in and start managing your tasks.</h6>
        </div>

        <form className="mt-5">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
            />
          </div>

          <div className="d-flex justify-content-end mt-2">
            <a href="/register">Register</a>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              class="btn border px-5"
              style={{ color: "white" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
