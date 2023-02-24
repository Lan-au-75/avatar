import { getNowPlaying } from '@/apis/nowPlaying.api'
import { getPopular } from '@/apis/popular.api'
import { getTopRated } from '@/apis/topRated.api'
import { getTrendingMovie } from '@/apis/trendingMovie.api'
import { getUpcoming } from '@/apis/upcoming.api'
import { Movie } from '@/types/movies.type'

const fetchTrendingMovie = async (page: number = 1) => {
    const res: Movie[] = await getTrendingMovie({ page })
    return res.slice(0, 10)
}

const fetchNowPlaying = async (page: number = 1) => {
    const res: Movie[] = await getNowPlaying({ page })
    return res.slice(0, 10)
}

const fetchTopRated = async (page: number = 1) => {
    const res: Movie[] = await getTopRated({ page })
    return res.slice(0, 10)
}

const fetchUpcoming = async (page: number = 1) => {
    const res: Movie[] = await getUpcoming({ page })
    return res.slice(0, 10)
}

const fetchPopularity = async (page: number = 1) => {
    const res: Movie[] = await getPopular({ page })
    return res.slice(0, 10)
}

export { fetchTrendingMovie, fetchNowPlaying, fetchPopularity, fetchTopRated, fetchUpcoming }
