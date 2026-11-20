import axios from "axios";
import type { IPlanet, IStrapiResponse, TPlanetInput } from "./types";

export const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
});


export const getPlanet = async (): Promise<IStrapiResponse<IPlanet[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IPlanet[]>>("/planets", {
        params: {
            populate: "*",
        },
    });
    return res.data;
};


export const createPlanet = async (input: TPlanetInput): Promise<IStrapiResponse<IPlanet>> => {
    const res = await apiInstance.post<IStrapiResponse<IPlanet>>("/planets", { 
        data: input 
    });
    return res.data;
};

export const removePlanet = async (documentId: string): Promise<void> => {
    await apiInstance.delete(`/planets/${documentId}`);
};

export const api = {
    getPlanet,
    createPlanet,
    removePlanet
};