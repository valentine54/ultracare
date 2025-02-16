import axios from "axios";

const API_KEY = "e4204b2c-3cf9-45e8-8837-db3a37121de5";
const API_URL = "http://127.0.0.1:8000/api/v1.0/";

import {loginAction} from '../store/actions/userAction'

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // If you're using cookies or authentication
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// Optional: Add an interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const sendExcesses = async (userData, navigate, setLoading) => {
  try {
    const response = await axiosInstance.patch(
      `motorinsurance/filter/`,
      userData
    );
    if (response.status === 200) {
      console.log(response.data);
      navigate(`/login`, { replace: true });
    }
  } catch (error) {
    console.error("Error sending excess charges:", error.response.data);
  }
};

export const getCurrentUser = async (dispatch) => {
  try {
    const response = await axiosInstance.get(`applicant/me/`);
    if (response.status === 200) {
      // console.log("User Data:", response.data);
      dispatch(loginAction(response.data));
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data);
  }
};

export const Signup = async (data, showToast,setLoading,url) => {
  console.log(data);
  try {
    const response = await axiosInstance.post(`${url}/signup/`, data);

    if (response.status === 201) {
      showToast(
        "Account created successfully! Redirecting to login...",
        "success"
      );
      console.log(response.data);

      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 3000);
    }
  } catch (error) {
    console.error("Error signing up:", error);
    const errorMessage =
      error.response?.data?.error || "Signup failed. Please try again.";
    showToast(errorMessage, "error");
  } finally {
    setLoading(false);
  }
};

export const Login = async (data, showToast, setLoading, url = "applicant",dispatch) => {
  try {
    setLoading(true); // Start loading
    const response = await axiosInstance.post(`${url}/login/`, data);

    if (response.status === 200) {
      showToast("Login successful!", "success");
      console.log("User Data:", response.data);
      dispatch(loginAction(response.data?.user)); 
      return response.data; // Return user data if needed
    } else {
      showToast("Login failed. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error logging in:", error?.response?.data || error.message);
    showToast(
      error?.response?.data?.error || "Login failed. Try again.",
      "error"
    );
  } finally {
    setLoading(false); // Stop loading
  }
};

export const UploadMotorInsurance = async (data) => {
  try {
    const response = await axiosInstance.post("motorinsurance/", data);
    if (response.status === 201) {
      console.log("Motor Insurance uploaded successfully:", response.data);
      return response
    } else {
      console.error("Failed to upload motor insurance:", response.data);
      return response;
    }
  } catch (error) {
    console.error("Error uploading motor insurance:", error.response.data);
    return error.response;
  }
  
}

export const MotorInsuranceDetails = async (data) => {
  try {
    const response = await axiosInstance.post(`motorinsurance/details/`, data);
    console.log("Motor Insurance details:", response);
    return response
  } catch (error) {
    console.error("Error fetching motor insurance details:", error.response);
    return false;
  }
}

export const Additionalcharge = async (data) => {
  try {
    const response = await  axiosInstance.post(`motorinsurance/optionalcharges/`,data);
    console.log("Additional charges:", response);
    return response
  } catch (error) {
    console.error("Error fetching additional charges:", error.response);
    return false;
  }
}