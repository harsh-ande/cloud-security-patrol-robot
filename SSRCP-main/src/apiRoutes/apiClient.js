// src/apiClient.js
import axios from "axios";
import { useNavigation } from "react-router-dom";

// Create an Axios instance
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
});

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response, // Return the response if status is not 401
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized error
      // Redirect user to the sign-in page (or logout if token is expired)
      //   console.log({ error });
      window.location.href = "/error"; // Use window.location for simple navigation
      //   handleUnauthorized();
      // Alternatively, if using React Router:
      //   const history = useHistory();
      //   history.push("/authentication/sign-in");
    }

    return Promise.reject(error); // Return the error so that other code can handle it
  }
);

// // Call this function once to set common headers before making any requests
// setCommonHeaders();
export const setCommonHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.sessionID || null; // Retrieve token from localStorage
  if (token) {
    // If the token exists, attach it to the Authorization header
    apiClient.defaults.headers["authorization"] = `Bearer ${token}`;
    apiClient.defaults.headers["Content-Type"] = "application/json"; // Set default content type for JSON
    apiClient.defaults.headers["Accept"] = "application/json";
  } else {
    // Token is not available, handle the absence accordingly (e.g., redirect to login)
    // window.location.href = "/error";
    // apiClient.defaults.headers["authorization"] = `Bearer ${token}`;
    apiClient.defaults.headers["Content-Type"] = "application/json"; // Set default content type for JSON
    apiClient.defaults.headers["Accept"] = "application/json";
  }
};
