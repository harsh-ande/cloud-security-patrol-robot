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
import { apiClient } from "./apiClient";

export const getAllRobots = async () => {
  try {
    console.log({ url: `GET : ${process.env.REACT_APP_API_URL}getAllRobots` });
    const response = await apiClient.get(`${process.env.REACT_APP_API_URL}getAllRobots`);
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const createRobot = async (robot) => {
  try {
    console.log({ url: `POST : ${process.env.REACT_APP_API_URL}createRobot` });
    const response = await apiClient.post(`${process.env.REACT_APP_API_URL}createRobot`, robot);
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteRobot = async (robot, id) => {
  console.log("WWOWOOW : ", { robot });
  try {
    console.log({ url: `GET : http://localhost:5000/control/deleteRobot` });
    const response = await axios.get(`http://localhost:5000/control/deleteRobot/${robot}`);

    console.log({ url: `DELETE : ${process.env.REACT_APP_API_URL}deleteRobot/${id}` });
    const resp = await apiClient.delete(`${process.env.REACT_APP_API_URL}deleteRobot/${id}`);
    return resp.status === 200 ? resp : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchRobot = async (robotId) => {
  try {
    console.log({ url: `GET : ${process.env.REACT_APP_API_URL}getRobot/${robotId}` });
    const response = await apiClient.get(`${process.env.REACT_APP_API_URL}getRobot/${robotId}`);
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchLast10Entries = async (params) => {
  try {
    console.log({
      url: `GET : ${process.env.REACT_APP_API_URL}streamLast10VehicleData`,
      params,
    });
    console.log("before get");
    const response = await apiClient.post(
      `${process.env.REACT_APP_API_URL}streamLast10VehicleData`,
      params
    );
    console.log("before get");
    return response.status === 200 ? response : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
