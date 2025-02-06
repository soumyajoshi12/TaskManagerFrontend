import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const TaskCard = ({ task }) => {
  return (
    <div className="border p-3 d-flex justify-content-between align-items-center mt-4">
      <input
        type="radio"
        className="form-check-input border border-2 border-success rounded-circle p-2"
      />
      <span>{task}</span>
      <div className="d-flex gap-4">
      <MdOutlineModeEditOutline />
      <MdDeleteOutline />
      </div>
    </div>
  );
};

export default TaskCard;
