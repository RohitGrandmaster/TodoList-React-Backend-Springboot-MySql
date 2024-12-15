const handleAddApi = async (todo) => {
  try {
    const API_BASE_URL = "http://localhost:8080/api/"; // Base URL for the API
    console.log("Sending data to backend:", todo);

    const response = await fetch(API_BASE_URL, { // Use the base URL, not with todo.title
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the content type is JSON
      },
      body: JSON.stringify(todo), // Send the entire todo object, not just the 'text'
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to add todo: ${response.statusText}`);
    }

    // Parse and return the JSON response
    const data = await response.json();
    console.log("Backend response received:", data);
    return data; // Return backend response data
  } catch (error) {
    console.error("Error adding todo:", error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default handleAddApi;
