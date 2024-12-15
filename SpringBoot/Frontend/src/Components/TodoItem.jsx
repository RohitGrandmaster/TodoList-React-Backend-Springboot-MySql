import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TaskItem = ({
  task,
  handleToggleComplete,
  handleDeleteTask,
  handleEditTask,
  isEditing
}) => {
  const isCompleted = task.completed === 1;

  const toggleClick = () => {
    // Toggle the completion status (true to false or false to true)
    handleToggleComplete(task.id, { ...task, completed: isCompleted ? 0 : 1 }); // Send 1 or 0 based on the toggle
  };

  return (
    <tr
      style={{
        backgroundColor: task.completed ? "#d3ffd3" : "black", // Change background color when task is completed
      }}
    >
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        <Button
          variant={task.completed ? "success" : "outline-warning"} // Change color based on completion status
          onClick={toggleClick} // Fix here: passing the function reference
        >
          {task.completed ? "Completed" : "Complete"}
        </Button>
      </td>
      <td>
        {/* Delete Button with Icon */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleDeleteTask(task.id)}
           className="button-gap"
        >
          <FaTrashAlt /> {/* Trash icon for Delete */}
        </Button>

        {/* Edit Button with Icon */}
        <Button
          variant={isEditing ? "success" : "outline-primary "}
           
          onClick={() => handleEditTask(task)}
          className="button-gap-left"
        >
          <FaEdit /> {/* Pencil icon for Edit */}
        </Button>
      </td>
    </tr>
  );
};

export default TaskItem;
