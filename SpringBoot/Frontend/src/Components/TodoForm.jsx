import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

const TaskForm = ({ onTaskAdded, taskToEdit, onUpdateTask }) => {
  const [inputValue, setInputValue] = useState(""); // Title input
  const [descValue, setDescValue] = useState(""); // Description input
  const [isEditing, setIsEditing] = useState(false); // Track if editing

  console.log("IsEditing:", isEditing);

  // If there's a task to edit, populate the form with that data
  useEffect(() => {
    if (taskToEdit) {
      console.log("Received task to edit:", taskToEdit); // Debugging received task
      setInputValue(taskToEdit.title);
      setDescValue(taskToEdit.description);
      setIsEditing(true); // Ensure isEditing is set to true when editing a task
    } else {
      setInputValue(""); // Reset input value when no task is being edited
      setDescValue("");
      setIsEditing(false); // Ensure isEditing is false when not editing
    }
  }, [taskToEdit]); // This will run when the taskToEdit prop changes

  // Handle form submission (Add or Edit task)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() && descValue.trim()) {
      const updatedTask = {
        id: isEditing ? taskToEdit.id : null,
        title: inputValue,
        description: descValue,
        completed: false,
      };
      console.log("Sending from frontend Updated Task:", updatedTask);

      if (isEditing) {
        // Update task in the database
        await onUpdateTask(updatedTask); // Notify parent to update the task
        setIsEditing(false); // Switch to "add mode" after editing
      } else {
        // Add new task to the database
        onTaskAdded(updatedTask); // Notify parent to add the task
      }

      setInputValue(""); // Clear input fields
      setDescValue("");
    }
  };

  return (
    <Container className="mt-5">
      <Form
        onSubmit={handleSubmit}
        className="todo-form p-3"
        style={{ background: "fuchsia" }}  
      >
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add a new todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Add a description"
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
        <Button
          type="submit"
          style={{ backgroundColor: isEditing ? "blue" : "green",  }}    //color: isEditing ? "black" : "white"
        >
          {isEditing ? "Save changes" : "Add Todo"}
        </Button>
      </Form>  
    </Container>
  );
};

export default TaskForm;
