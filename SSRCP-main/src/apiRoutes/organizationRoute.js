import axios from "axios";
import { apiClient } from "./apiClient";

export const createOrganization = async (orgInfo) => {
  try {
    console.log({ url: `${process.env.REACT_APP_API_URL}createOrganization` });
    const response = await apiClient.post(
      `${process.env.REACT_APP_API_URL}createOrganization`,
      orgInfo
    );
    return response.status === 200 ? response.data : new Error("Error");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getOrganizations = async () => {
  try {
    // const navigate = useNavigate();
    console.log({ url: `${process.env.REACT_APP_API_URL}Organizations` });
    const response = await apiClient.get(`${process.env.REACT_APP_API_URL}Organizations`);
    console.log("organization api response from backend");
    console.log(response);
    return response.status === 200 ? response.data : new Error("Error");
  } catch (e) {
    console.log("Hi");
    console.error("Error fetching data:", e);
    // if (e.status == 401) navigate("/authentication/sign-in");
  }
};

export const editOrganizationRequest = async (org, organizationName, isActive) => {
  try {
    console.log(
      { url: `${process.env.REACT_APP_API_URL}Organization` },
      { org, organizationName, isActive }
    );
    const response = await apiClient.put(`${process.env.REACT_APP_API_URL}Organization`, {
      org_Id: org.id,
      organizationName,
      isActive,
    });
    return response.status === 200 ? response.data : new Error("Error");
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};
