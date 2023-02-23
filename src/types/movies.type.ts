export interface Movie {
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
}

export type TV = {
    first_air_date: string
    name: string
    origin_country: string[]
    original_name: string
    movie: Pick<
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
    >
}
