import React, { useState, useEffect } from "react";
import { createTodo } from "../../services/todoTaskService";
import { jwtDecode } from "jwt-decode";

const TodoForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    email: "", // Initialize email in the state
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update email after the component is mounted
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from storage
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken.email", decodedToken?.email); // Access email
      setFormData((prev) => ({ ...prev, email: decodedToken?.email }));
    }
  }, []); // Empty dependency array means this runs only once after the initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    try {
      setLoading(true);
      const newTask = await createTodo(formData);
      onTaskCreated(newTask);
      setFormData((prev) => ({ ...prev, title: "",description:"",status:"pending" }));; // Reset form
    } catch (err) {
      setError("Failed to create task. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mt-5 p-4 border rounded bg-dark text-white w-100"
      onSubmit={handleSubmit}
    >
      <h4 className="text-center">Create a New Task</h4>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Task"}
      </button>
    </form>
  );
};

export default TodoForm;
