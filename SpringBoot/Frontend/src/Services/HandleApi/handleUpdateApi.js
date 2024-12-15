const handleUpdateApi = async (id, updatedTask) => {
  try {
    const API_BASE_URL = "http://localhost:8080/api/"; 

    // // Ensure this is the correct endpoint
    const response = await fetch(`${API_BASE_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask), // Send the updated task object
    });

    console.log("API Response:", response);
    
    // Check if the response is not OK (status code is not 2xx)
    if (!response.ok) {
      // Log the response status and message for debugging
      const errorDetails = await response.text(); // You can log the raw response text
      throw new Error(`Failed to update todo. Status: ${response.status}. ${errorDetails}`);
    }

    // Try parsing the response JSON (ensure the server sends back valid JSON)
    const responseData = response.status !== 204 ? await response.json() : null;
    console.log("Backend Updated Task Response:", responseData);
    return responseData;
  } catch (error) {
    // Log and rethrow the error so the caller can handle it
    console.error("Error updating todo:", error.message);
    throw error;
  }
};

export default handleUpdateApi;
