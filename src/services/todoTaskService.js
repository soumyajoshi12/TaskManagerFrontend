import { jwtDecode } from "jwt-decode";
import axios from "../utils/axios";


export const createTodo = async (formData) => {
  try {
    const response = await axios.post(`/todos`, { formData });
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const getTodos = async (email, status) => {
  try {
    const params = {};
    if (email) params.email = email;
    if (status) params.status = status;

    const response = await axios.get(`/todos`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};


export const updateTodo = async (id, updatedData) => {
  try {
    const response = await axios.put(`/todos/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating todo:",
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || "Failed to update task.");
  }
};

// Delete a task
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getLoggedInUser = () => {

  const token = localStorage.getItem("token"); // Retrieve token from storage
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.userId); // Access userId
    return decodedToken.userId;
  }
  
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

