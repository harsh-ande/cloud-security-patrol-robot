/*

userInfo = {
    username: ""
    email: ""
    password: ""
    userType: SUPER_ADMIN / ADMIN / STAFF
    organizationId : 1/2/3
    createdBy:
    updatedBy
    createdAt
    updatedAt
}

*/
import axios from "axios";
import { apiClient, setCommonHeaders } from "./apiClient";
// import { useNavigate } from "react-router-dom";
export const createUser = async (userInfo) => {
  try {
    console.log({ url: `${process.env.REACT_APP_API_URL}user` });
    const response = await apiClient.post(`${process.env.REACT_APP_API_URL}user`, userInfo);
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateUserRoute = async (userInfo) => {
  try {
    console.log({ url: `${process.env.REACT_APP_API_URL}user` });
    const response = await apiClient.put(`${process.env.REACT_APP_API_URL}user`, userInfo);
    return response.status === 200 ? response.data : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const getAllUsers = async () => {
  try {
    console.log({ url: `${process.env.REACT_APP_API_URL}getUsers` });
    const response = await apiClient.get(`${process.env.REACT_APP_API_URL}getUsers`);
    console.log({ response: response });
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    // if (error.status == 401) navigate("/authentication/sign-in");

    console.error("Error fetching data:", error);
  }
};

export const getUserById = async (id) => {
  try {
    console.log({ url: `GET : ${process.env.REACT_APP_API_URL}user`, params: { id } });
    const response = await apiClient.get(`${process.env.REACT_APP_API_URL}user`, {
      params: { id },
    });
    console.log({ response: response });
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteUserRoute = async (id) => {
  try {
    console.log({ url: `DELETE : ${process.env.REACT_APP_API_URL}user`, id });
    const response = await apiClient.delete(`${process.env.REACT_APP_API_URL}user`, {
      params: { id },
    });
    console.log({ response: response });
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
