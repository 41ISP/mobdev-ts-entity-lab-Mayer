import axios from "axios"
import type { IPlanet, IStrapiResponse } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getPlanet = async (): Promise<IStrapiResponse<IPlanet[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IPlanet[]>>("/planets", {
        params: {
            populate: "cover",
        },
    })
    return res.data
}
// const postPlanet = async (input): Promise<IStrapiResponse<IPlanet[]>> => {
//     const res = await apiInstance.post<IStrapiResponse<IPlanet[]>>("/planets", {data: input})
//     return res.data
// }

// const deletePlanet = async (): Promise<IStrapiResponse<IPlanet[]>> => {
//     const res = await apiInstance.delete<IStrapiResponse<IPlanet[]>>("/planets/documentid")
//     return res.data
// }



export const api = { getPlanet }