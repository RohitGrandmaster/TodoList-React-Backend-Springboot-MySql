 import React from "react";
import TaskItem from "../Components/TodoItem"; // Importing TaskItem component
import { Table, Container } from "react-bootstrap";

const TaskList = ({ tasks,ToggleComplete,DeleteTask,handleEdit,taskToEdit }) => {

   
  return (
    <Container className="table-container">
      {tasks.length === 0 ? (
        <p className="text-center">No tasks available!</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ color: "black" }}>ID</th>
              <th style={{ color: "fuchsia" }}>Title</th>
              <th style={{ color: "lime" }}>Description</th>
              <th style={{ color: "blue" }}>Completed</th>
              <th style={{ color: "red" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleToggleComplete={ToggleComplete}
                handleDeleteTask={DeleteTask}
                handleEditTask={handleEdit}
                isEditing={task.id === taskToEdit?.id} 
              />
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default TaskList;
