import { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { Modal } from "../EditModal";
import { deleteTodo } from "../../services/todoTaskService";

const TaskCard = ({ task, updateTask, removeTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      removeTask(task.id);

      try {
        await deleteTodo(task.id);
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  return (
    <div className="border p-3 mt-4 w-100">
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold">
          {task.title.charAt(0).toUpperCase() + task?.title.slice(1)}
        </span>
        <div className="d-flex align-items-center gap-4">
        <div className="d-flex gap-3">
          <MdOutlineModeEditOutline
            onClick={handleEditClick}
            style={{ cursor: "pointer" }}
          />
          <MdDeleteOutline
            onClick={handleDeleteClick}
            style={{
              cursor: "pointer",
              color: "red",
              opacity: isDeleting ? 0.5 : 1,
            }}
            disabled={isDeleting}
          />
        </div>
        <div
          className="border rounder p-2"
          style={{
            backgroundColor:
              task?.status === "pending"
                ? "red"
                : task?.status === "in-progress"
                ? "#FFB900"
                : "#198754",
          }}
        >
          <text>
            {task?.status.charAt(0).toUpperCase() + task?.status.slice(1)}
          </text>
        </div>
        </div>
      </div>
      <div className="mt-1 text-secondary">
        {task?.description.length > 150
          ? `${task.description.slice(0, 150)}...`
          : task.description}
      </div>

      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        task={task}
        updateTask={updateTask}
      />
    </div>
  );
};

export default TaskCard;
