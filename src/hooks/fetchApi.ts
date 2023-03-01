import { getAiringToDay } from '@/apis/airingToDay.api'
import { getNowPlaying } from '@/apis/nowPlaying.api'
import { getPopular } from '@/apis/popular.api'
import { getTopRated } from '@/apis/topRated.api'
import { getTrendingMovie } from '@/apis/trendingMovie.api'
import { getUpcoming } from '@/apis/upcoming.api'
import { Movie, TV } from '@/types/movies.type'

const LIMIT = 9

const fetchTrendingMovie = async (category: string, page: number | string = 1) => {
    const res = await getTrendingMovie({ category, page })
    const movies: Movie[] = res.results
    const totalPages: number | string = res.total_pages

    return {
        totalPages,
        movies: movies.slice(0, LIMIT),
    }
}

const fetchNowPlaying = async (page: number | string = 1) => {
    const res = await getNowPlaying({ page })
    const movies: Movie[] = res.results
    const totalPages: number | string = res.total_pages

    return {
        totalPages,
        movies: movies.slice(0, LIMIT),
    }
}

const fetchTopRated = async (category: string, page: number | string = 1) => {
    const res = await getTopRated({ category, page })
    const movies: Movie[] = res.results
    const totalPages: number | string = res.total_pages

    return {
        totalPages,
        movies: movies.slice(0, LIMIT),
    }
}

const fetchUpcoming = async (page: number | string = 1) => {
    const res = await getUpcoming({ page })
    const movies: Movie[] = res.results
    const totalPages: number | string = res.total_pages

    return {
        totalPages,
        movies: movies?.slice(0, LIMIT),
    }
}

const fetchPopularity = async (category: string, page: number | string = 1) => {
    const res = await getPopular({ category, page })
    const movies: Movie[] = res.results
    const totalPages: number | string = res.total_pages

    return {
        totalPages,
        movies: movies.slice(0, LIMIT),
    }
}

const fetchAiringToDay = async (page: number | string = 1) => {
    const res = await getAiringToDay({ page })
    const movies: TV[] = res.results
    const totalPages: number | string = res.total_pages

    return {
        totalPages,
        movies: movies.slice(0, LIMIT),
    }
}

export {
    fetchTrendingMovie,
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchUpcoming,
    fetchAiringToDay,
}
