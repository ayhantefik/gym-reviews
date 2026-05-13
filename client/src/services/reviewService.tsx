import api from "../api/api";
import type { AxiosResponse } from "axios";
import type { Review } from "../types";

export const getReviews = async () => {
    try{
        const response: AxiosResponse<Review[]> = await api.get('/reviews');
        console.log("response.data ", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching gyms", error);
        throw error;
    }
}

export const addReview = async (review: Review, token: string | undefined): Promise<Review> => {
    try {
        const response: AxiosResponse<Review> = await api.post('/reviews', review, { 
            headers: {
                Authorization: `Bearer ${token}`
        }});
        return response.data;
    } catch (error) {
        console.error("Error adding gym", error);
        throw error;
    }
};