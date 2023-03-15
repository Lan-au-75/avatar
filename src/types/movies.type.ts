type TVShow = Pick<TV, 'name' | 'first_air_date'>

export interface Movie extends TVShow {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number | string
    vote_count: number
    media_type: string
}

type MovieShow = Pick<
    Movie,
    | 'backdrop_path'
    | 'genre_ids'
    | 'id'
    | 'original_language'
    | 'overview'
    | 'popularity'
    | 'poster_path'
    | 'vote_average'
    | 'vote_count'
    | 'original_title'
    | 'release_date'
    | 'media_type'
>

export interface TV extends MovieShow {
    first_air_date: string
    name: string
    origin_country: string[]
    original_name: string
}

export enum Category {
    Movie = 'movie',
    Tv = 'tv',
}

export interface Detail {
    backdrop_path: string
    genres: [
        {
            id: number
            name: string
        }
    ]
    id: number
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    production_countries: Array<any>
    release_date: string
    revenue: number
    runtime: number
    status: string
    tagline: string
    title: string
    vote_average: number
    vote_count: number
    name: string
    first_air_date: string
    last_air_date: string
    homepage: string
    number_of_episodes: number
    episode_run_time: number[]
    seasons: [
        {
            id: number
            name: string
            overview: string
            poster_path: string
            episode_count: number
            season_number: number
        }
    ]
}

export interface Video {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    official: boolean
    published_at: string
    site: string
    size: number
    type: string
}

export interface Review {
    author: string
    author_details: {
        avatar_path: string
        name: string
        rating: number
        username: string
    }
    content: string
    created_at: '2023-02-01T18:18:26.854Z'
    id: '63daacf2a9117f009da4d879'
    updated_at: '2023-02-01T18:18:26.960Z'
    url: 'https://www.themoviedb.org/review/63daacf2a9117f009da4d879'
}

export interface Genres {
    id: number
    name: string
}
