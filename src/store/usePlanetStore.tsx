import { create } from "zustand"
import type { IPlanet, IStrapiResponse } from "../types"
import { api } from "../api"

interface IPlanetStore {
    planets: IStrapiResponse<IPlanet[]> | undefined,
    getPlanet: () => void
}

export const usePlanetStore = create<IPlanetStore>((set) => ({
    planets: undefined,
    getPlanet: async () => {
        try {
            const res = await api.getPlanet()
            set({ planets: res })
        } catch (error) {
            console.error(error)
        }
    },
}))