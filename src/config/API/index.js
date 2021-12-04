import axios from "axios";

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || "http://localhost:7000/api/v1/"
})

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}