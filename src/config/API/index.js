import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:7000/api/v1/" || process.env.REACT_APP_BASE_API_URL
})

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}