const handleDeleteApi = async (id) => {
  try {
    const API_BASE_URL = "http://localhost:8080/api/"; 

    const response = await fetch(`${API_BASE_URL}${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    console.log(`Todo with ID ${id} has been deleted`);
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    throw error;
  }
};

export default handleDeleteApi;
