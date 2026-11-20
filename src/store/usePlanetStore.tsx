import { create } from "zustand";
import type { IPlanet, TPlanetInput } from "../types";
import { api } from "../api";

// Интерфейс состояния стора
interface PlanetState {
    planets: IPlanet[];
    loading: boolean;
    error: string | null;

    getPlanet: () => Promise<void>;
    addPlanet: (data: TPlanetInput) => Promise<void>;
    removePlanet: (documentId: string) => Promise<void>;
}

export const usePlanetStore = create<PlanetState>((set) => ({
    planets: [],
    loading: false,
    error: null,

    // Получение списка
    getPlanet: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.getPlanet();
            set({ planets: data });
        } catch (e: any) {
            const message = e.response?.data?.error?.message 
                ? e.response.data.error.message 
                : "Не удалось загрузить планеты";
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    // Создание планеты
    addPlanet: async (data) => {
        try {
            await api.createPlanet(data);
            // Обновляем список после создания
            await usePlanetStore.getState().getPlanet();
        } catch (e: any) {
            const message = e.response?.data?.error?.message 
                ? e.response.data.error.message 
                : "Не удалось создать планету";
            set({ error: message });
            throw e; // Пробрасываем ошибку дальше, если в форме нужен isSubmitting
        }
    },

    // Удаление планеты
    removePlanet: async (documentId) => {
        try {
            await api.removePlanet(documentId);
            // Обновляем список после удаления
            await usePlanetStore.getState().getPlanet();
        } catch (e: any) {
            const message = e.response?.data?.error?.message 
                ? e.response.data.error.message 
                : "Не удалось удалить планету";
            set({ error: message });
            throw e;
        }
    },
}));