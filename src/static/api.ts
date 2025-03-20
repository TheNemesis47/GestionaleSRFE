import axios, {AxiosRequestConfig} from "axios";

const API_URL = "http://localhost:8080";

export const fetchWithAuth = async <T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: T
) => {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        Authorization: `Bearer ${token ?? ""}`,
    };

    // Creiamo la config di base
    const config: AxiosRequestConfig = {
        url: `${API_URL}${endpoint}`,
        method,
        headers,
    };

    // Se data è un FormData, lasciamo che Axios gestisca boundary e Content-Type
    if (data instanceof FormData) {
        config.data = data;
    }
    // Altrimenti, se data esiste, inviamo JSON
    else if (data) {
        headers["Content-Type"] = "application/json";
        config.data = JSON.stringify(data);
    }

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        // Gestione del 401: se il token non è valido, rimanda al login
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        throw error;
    }
};