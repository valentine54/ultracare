import axios from "axios";


const API_KEY = "e4204b2c-3cf9-45e8-8837-db3a37121de5";
const API_URL = "http://127.0.0.1:8000/api/v1.0/";

export const sendExcesses = async (data,navigate) => {

    try {
        const response = await axios.patch(
          `${API_URL}motorinsurance/filter/`,
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );
        if (response.status === 200) {
            console.log( response.data);
            navigate(`/login`, { replace: true });
        }

    } catch (error) {
        console.error("Error sending excess charges:", error.response.data);
    }
}

