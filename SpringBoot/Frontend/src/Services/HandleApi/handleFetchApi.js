 

  const handleFetchApi = async () => {
  try {
    const API_BASE_URL = "http://localhost:8080/api/"; 

    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
};

export default handleFetchApi;

