import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/Register";
import TaskManager from "../views/TaskManager";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskManager />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
