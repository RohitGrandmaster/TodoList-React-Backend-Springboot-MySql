import React, { useEffect, useState } from "react";
import TaskForm from './Components/TodoForm';  // Import TaskForm component
import TaskList from './Components/TodoList';  // Import TaskList component
import handleDeleteApi from "./Services/HandleApi/handleDeleteApi";
import handleFetchApi from './Services/HandleApi/handleFetchApi';
import handleUpdateApi from "./Services/HandleApi/handleUpdateApi";
import handleAddApi from './Services/HandleApi/handleAddApi'; // Assuming this function exists
import './Styles/Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [List, setList] = useState([]);  // Store list of tasks
  const [taskToEdit, setTaskToEdit] = useState(null);  // Store task that is being edited

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await handleFetchApi();
        setList(data);  // Store tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();  // Fetch tasks on component mount
  }, []);

  // Handle new task addition
  const handleTaskAdded = async (newTask) => {
    try {
      const addedTask = await handleAddApi(newTask);  // Add task and get full response (with id)
      setList((prevTasks) => [...prevTasks, addedTask]);  // Add new task to the state
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  // Handle task update
  const taskEdit = async (editedTask) => {
    try {
      const updatedTask = await handleUpdateApi(editedTask.id, editedTask);  // Update task in backend

      // Update the task in the state with the new data
      setList((prevList) =>
        prevList.map((task) =>
          task.id === editedTask.id ? updatedTask : task
        )
      );

      console.log("UI showing data Successfully:", updatedTask);

      // After editing, reset the taskToEdit to null
      setTaskToEdit(null);  // Clear taskToEdit state after edit
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  // Handle task completion toggle
  const handleToggle = async (id, updatedTask) => {
    try {
      const updated = await handleUpdateApi(id, updatedTask);  // Update task completion in backend

      // Update frontend state with the updated task data
      setList((prevList) =>
        prevList.map((task) => (task.id === id ? updated : task)) // Replace the updated task in the list
      );
    } catch (error) {
      console.error("Error updating task completion:", error.message);
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      await handleDeleteApi(id);  // Delete task from backend
      setList((prevList) => prevList.filter((task) => task.id !== id));  // Remove task from state
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="app-container">
      <TaskForm
        onTaskAdded={handleTaskAdded}
        taskToEdit={taskToEdit}  // Pass taskToEdit to TaskForm
        onUpdateTask={taskEdit}  // Pass taskEdit to handle task update
      />
      <TaskList
        tasks={List}  // Pass the tasks stored in List to TaskList
        ToggleComplete={handleToggle}
        DeleteTask={handleDelete}  // Function for task deletion
        handleEdit={setTaskToEdit}  // Function to set taskToEdit for editing
        taskToEdit = {taskToEdit}
      />
    </div>
  );
};

export default App;
