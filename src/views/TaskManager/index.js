import React from "react";
import { SiTicktick } from "react-icons/si";
import TaskCard from "../../components/TaskCard";

const TaskManager = () => {
  return (
    <div
      className="d-flex align-item-center flex-column p-5"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <div style={{ width: "40%" }}>
        <div className="d-flex gap-2 align-item-center">
          <SiTicktick size={"30px"} />
          <h2>Task Manager</h2>
        </div>
        <div className="d-flex align-items-center justify-content-evenly border rounded p-5">
          <div className="d-flex flex-column">
            <text className="fs-4 fw-bold">Task Done</text>
            <text className="fs-5">Keep it up</text>
          </div>
          <div
            class="bg-success text-white d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "100px", height: "100px" }}
          >
            <span className="fs-2">1/3</span>
          </div>
        </div>
        <form className="mt-4">
          <div class="form-group row">
            <div class="col-sm-20 d-flex align-items-center">
              <input
                type="text"
                class="form-control me-2"
                id="task"
                placeholder="Enter Your Task"
              />
              <button type="submit" class="btn btn-success">
                <span className="px-4">+</span>
              </button>
            </div>
          </div>
        </form>
        <TaskCard task={"Task manager UI Completion"} />
      </div>
    </div>
  );
};

export default TaskManager;
