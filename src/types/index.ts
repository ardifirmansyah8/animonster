export type PageInfo = {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: boolean;
    format: string;
}

export type Title = {
    romaji: string;
    english: string;
    native: string;
}

export interface Image {
    large: string;
    medium: string;
}

export interface Anime {
    id: number;
    bannerImage: string;
    description: string;
    genres: string[];
    title: Title;
    coverImage: Image;
    averageScore: number;
    episodes: number;
    studios: {
        nodes: {
            name: string
        }[]
    }
}