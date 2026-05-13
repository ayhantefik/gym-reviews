import api from "../api/api";
import type { AxiosResponse } from "axios";
import type { Gym } from "../types";

export const getGyms = async () => {
    try{
        const response: AxiosResponse<Gym[]> = await api.get('/gyms');
        return response.data;
    } catch (error) {
        console.error("Error fetching gyms", error);
        throw error;
    }
}