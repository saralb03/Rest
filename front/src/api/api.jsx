import axios from "axios";
const BACKEND_URL = "http://localhost:3001";
const headers = {
  "x-api-key": localStorage.getItem("token"),
};

export const post = async (body, route) => {
  try {
    const headers = {
      "x-api-key": localStorage.getItem("token"),
    };

    console.log("route: " + route);
    const response = await axios.post(
      `${BACKEND_URL}/${route}`,
      body, // Corrected: body should be the second argument
      {
        headers: headers,
      }
    );

    console.log("response.data", response);
    return response; // Return the entire response object
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

export const postRest = async (body, route) => {
  try {
    console.log("route: " + route);
    const response = await axios.post(`${BACKEND_URL}/${route}`, body);
    console.log("response.data", response);
    return response; // Return the entire response object
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

export const patch = async (body, url) => {
  try {
    const headers = {
      'x-api-key': localStorage.getItem('token'),
      'Content-Type': 'application/json', // Add this line
    };

    console.log('Patch URL:', `${BACKEND_URL}/${url}`);
    console.log('Patch Body:', body);

    const response = await axios.patch(`${BACKEND_URL}/${url}`, body, {
      headers: headers || {},
    });

    console.log('Patch Response:', response);

    return response;
  } catch (error) {
    console.error('Error patching data:', error);
    throw error;
  }
};

export const get = async (url) => {
  try {
    const headers = {
      "x-api-key": localStorage.getItem("token"),
    };
    console.log(`${BACKEND_URL}/${url}`);
    const response = await axios.get(`${BACKEND_URL}/${url}`, {
      headers: headers || {},
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`error ${err}`);
    // Handle the error or rethrow it
    throw err;
  }
};

export const remove = async (url) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${url}`, {
      method: "DELETE",
      headers: headers || {},
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to delete data");
    }

    console.log("Data deleted successfully.");
    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Error deleting data:", error.message);
    throw new Error("Internal Server Error");
  }
};
