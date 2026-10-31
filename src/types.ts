export interface IStrapiResponse<T> {
    data: T
    meta?: Meta
}

export interface IMedia {
    id: number
    url: string
    alternativeText?: string
}

export interface IPlanet {
  id: number
  documentId: string
  name: string
  description?: string
  distanceFromSun?: string
  diameter?: number
  mass?: number
  type: PlanetType
  discoveredDate: string
  features?: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: Image
}

export interface Image {
  id: number
  documentId: string
  name: string
  alternativeText: any
  caption: any
  focalPoint: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}


export interface Formats {
  large: IMediaFormat
  small: IMediaFormat
  medium: IMediaFormat
  thumbnail: IMediaFormat}

export interface IMediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}

// export interface Description {
//     type: string
//     children: Children[]
// }

// export interface Children {
//     text: string
//     type: string
// }

 export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}


// export type TPlanetInput = Omit<
//     IPlanet,
//     "id" | "documentId" | "cover" | "createdAt" | "updatedAt" | "publishedAt"
// >



export const TYPES = ["terrestrial", "gasGigant", "iceGigant", "ocean"] as const
export type PlanetType = (typeof TYPES)[number]

export const TYPES_LABELS: Record<PlanetType, string> = {
    terrestrial: "Земной тип",
    gasGigant: "Газовый гигант",
    iceGigant: "Ледяной гигант",
    ocean: "Водный тип"
}