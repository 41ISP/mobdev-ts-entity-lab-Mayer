import axios from "axios";
import type { IPlanet, IStrapiResponse, TPlanetInput } from "./types";

export const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// В .env обычно пишут полный путь: VITE_API_URL=https://strapi.kitek-pg.ru/api
// Поэтому в baseURL добавляем только корень, чтобы не получить /api/api
export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
});

// GET: возвращает массив планет
export const getPlanet = async (): Promise<IStrapiResponse<IPlanet[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IPlanet[]>>("/planets", {
        params: {
            populate: "*",
        },
    });
    return res.data;
};

// POST: возвращает одну созданную планету
export const createPlanet = async (input: TPlanetInput): Promise<IStrapiResponse<IPlanet>> => {
    const res = await apiInstance.post<IStrapiResponse<IPlanet>>("/planets", { 
        data: input 
    });
    return res.data;
};

// DELETE: ничего не возвращает
export const removePlanet = async (documentId: string): Promise<void> => {
    await apiInstance.delete(`/planets/${documentId}`);
};

// Экспортируем объект для удобства импорта в стор и компоненты
export const api = {
    getPlanet,
    createPlanet,
    removePlanet
};