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

export const addGym = async (gym: Gym, token: string | undefined): Promise<Gym> => {
    try {
        const response: AxiosResponse<Gym> = await api.post('/gyms', gym, { 
            headers: {
                Authorization: `Bearer ${token}`
        }});
        return response.data;
    } catch (error) {
        console.error("Error adding gym", error);
        throw error;
    }
};