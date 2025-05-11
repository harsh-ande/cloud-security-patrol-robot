// src/App.js
import axios from "axios";
import { apiClient, setCommonHeaders } from "./apiClient";

const loginRoute = async (user) => {
  try {
    console.log({ url: `${process.env.REACT_APP_API_URL}login` });
    const response = await apiClient.post(`${process.env.REACT_APP_API_URL}login`, user);
    if (response.status == 200) {
      localStorage.setItem("user", JSON.stringify(response.data?.user || response.data));
      // setCommonHeaders();
      return response.data;
    } else {
      console.log(response.status);
      console.log(response.data);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default loginRoute;
