export interface NewsImage {
    url: string
    width: number
    height: number
}

export interface News {
    id: string
    slug: string
    image: NewsImage[]
    title: string
    description: string[]
    shortDescription: string
    date: string
}