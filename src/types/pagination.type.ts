import { Movie } from '@/types/movies.type'
import { UseQueryResult } from 'react-query'

export interface TrendingPage {
    pageTrending: number
    setPageTrending: React.Dispatch<React.SetStateAction<string | number | undefined>>

    trendingMovie: UseQueryResult<
        {
            totalPages: number | string
            movies: Movie[]
        },
        unknown
    >
}

export interface NowPlayingPage {
    pageNowPlaying: number
    setPageNowPlaying: React.Dispatch<React.SetStateAction<string | number | undefined>>

    nowPlaying: UseQueryResult<
        {
            totalPages: string | number
            movies: Movie[]
        },
        unknown
    >
}

export interface TopRatedPage {
    pageTopRated: number
    setPageTopRated: React.Dispatch<React.SetStateAction<string | number | undefined>>

    topRated: UseQueryResult<
        {
            totalPages: string | number
            movies: Movie[]
        },
        unknown
    >
}

export interface UpcomingPage {
    pageUpcoming: number
    setPageUpcoming: React.Dispatch<React.SetStateAction<string | number | undefined>>

    upcoming: UseQueryResult<
        {
            totalPages: string | number
            movies: Movie[]
        },
        unknown
    >
}

export interface PopularityPage {
    pagePopularity: number
    setPagePopularity: React.Dispatch<React.SetStateAction<string | number | undefined>>

    popularity: UseQueryResult<
        {
            totalPages: string | number
            movies: Movie[]
        },
        unknown
    >
}

export interface LatestPage {
    pageLatest: number
    setPageLatest: React.Dispatch<React.SetStateAction<string | number | undefined>>

    latest: UseQueryResult<
        {
            totalPages: string | number
            movies: Movie[]
        },
        unknown
    >
}
