import { useEffect, useState } from 'react'
import { getPopular } from '@/apis/popular.api'
import { getTrendingMovie } from '@/apis/trendingMovie.api'
import { Movie } from '@/types/movies.type'
import Row from './Row'
import Thumbnail1 from './Thumbnail1'
import Thumbnail2 from './Thumbnail2'
import Thumbnail3 from './Thumbnail3'
import { getNowPlaying } from '@/apis/nowPlaying.api'
import { getTopRated } from '@/apis/topRated.api'
import { getUpcoming } from '@/apis/upcoming.api'

function Container() {
    const [popularity, setPopularity] = useState<Movie[]>([])
    const [trendingMovie, setTrendingMovie] = useState<Movie[]>([])
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])

    useEffect(() => {
        const getPopularApi = async () => {
            const res: Movie[] = await getPopular({
                page: 1,
            })

            setPopularity(res.slice(0, 10))
        }
        getPopularApi()
    }, [])

    useEffect(() => {
        const getTrendingMovieApi = async () => {
            const res = await getTrendingMovie({
                page: 1,
            })

            setTrendingMovie(res.slice(0, 10))
        }
        getTrendingMovieApi()
    }, [])

    useEffect(() => {
        const getNowPlayingApi = async () => {
            const res = await getNowPlaying({
                page: 2,
            })

            setNowPlaying(res.slice(0, 10))
        }
        getNowPlayingApi()
    }, [])

    useEffect(() => {
        const getTopRatedApi = async () => {
            const res = await getTopRated({
                page: 1,
            })

            setTopRated(res.slice(0, 10))
        }
        getTopRatedApi()
    }, [])

    useEffect(() => {
        const getUpcomingApi = async () => {
            const res = await getUpcoming({
                page: 1,
            })

            setUpcoming(res.slice(0, 10))
        }
        getUpcomingApi()
    }, [])

    return (
        <main className='container'>
            <Row title='Trending Movies' movies={trendingMovie} Thumbnail={Thumbnail2} />
            <Row title='Continue watching' movies={nowPlaying} Thumbnail={Thumbnail3} />
            <Row title='Top rated' movies={topRated} Thumbnail={Thumbnail1} />
            <Row title='Upcoming' movies={upcoming} Thumbnail={Thumbnail1} />
            <Row title='Popular' movies={popularity} Thumbnail={Thumbnail1} />
        </main>
    )
}

export default Container
