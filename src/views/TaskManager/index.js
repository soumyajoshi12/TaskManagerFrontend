import React, { useContext, useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import TaskCard from "../../components/TaskCard";
import {
  getTodos,
  isAuthenticated,
  logout,
} from "../../services/todoTaskService";
import { TaskContext } from "../../context/TaskContext";
import TodoForm from "../../components/TaskForm";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TaskManager = () => {
  const { data, setData } = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken.email", decodedToken?.email); // Access email
      setEmail(decodedToken?.email);
    }
  }, []);

  const fetchAllTasks = async (status = "") => {
    try {
      setLoading(true);
      const response = await getTodos(email,status);
      console.log("response", response);

      setData(response || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks(statusFilter);
  }, [statusFilter,email]);

  const handleTaskCreated = (newTask) => {
    fetchAllTasks(statusFilter);

  };

  const handleTaskDeleted = (taskId) => {
    setData((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleTaskUpdated = (updatedTask) => {
    setData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <div
      className="d-flex"
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <div
        className="d-flex align-items-center flex-column p-2"
        style={{ width: "40%", height: "100vh", overflow: "hidden" }}
      >
        <TodoForm onTaskCreated={handleTaskCreated} />
      </div>

      <div
        className="d-flex align-items-center flex-column p-5"
        style={{ width: "60%", height: "100vh", overflowY: "auto" }}
      >
        <div className="d-flex w-100 justify-content-end">
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <SiTicktick size={"30px"} />
          <h2>Task Manager</h2>
        </div>

        <div className="d-flex align-items-center justify-content-between border rounded p-5 w-100">
          <div className="d-flex flex-column">
            <span className="fs-4 fw-bold">Task Done</span>
            <span className="fs-5">Keep it up</span>
          </div>
          <div
            className="bg-success text-white d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "100px", height: "100px" }}
          >
            <span className="fs-2">
              {data.filter((task) => task.status === "completed").length}/
              {data.length}
            </span>
          </div>
        </div>

        <div className="my-3 d-flex justify-content-end w-100">
          <select
            className="form-select w-25"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center mt-3">Loading tasks...</p>
        ) : data.length > 0 ? (
          data.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              updateTask={handleTaskUpdated}
              removeTask={handleTaskDeleted}
            />
          ))
        ) : (
          <p className="text-center mt-3">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
