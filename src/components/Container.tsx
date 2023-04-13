import { useQuery } from 'react-query'

import {
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchTrendingMovie,
    fetchUpcoming,
} from '@/hooks/fetchApi'
import { Category } from '@/types/movies.type'

import Row from './Row'
import Thumbnail1 from './Thumbnail1'
import Thumbnail2 from './Thumbnail2'
import Thumbnail3 from './Thumbnail3'
import { useInView } from 'react-intersection-observer'

function Container() {
    const { ref: topRatedRef, inView: elementTopRatedRef } = useInView({ threshold: 0.5 })
    const { ref: upcomingRef, inView: elementUpcomingRef } = useInView({ threshold: 0.5 })
    const { ref: popularityRef, inView: elementPopularityRef } = useInView({ threshold: 0.5 })

    const trendingMovie = useQuery(['trendingData'], () => fetchTrendingMovie(Category.Movie), {
        staleTime: 60 * 1000,
    })
    const nowPlaying = useQuery(['nowPlayingData'], async () => fetchNowPlaying(), {
        staleTime: 60 * 1000,
    })
    const topRated = useQuery(['topRatedData'], async () => fetchTopRated(Category.Movie), {
        staleTime: 60 * 1000,
        enabled: elementTopRatedRef,
    })
    const upcoming = useQuery(['upcomingData'], async () => fetchUpcoming(), {
        staleTime: 60 * 1000,
        enabled: elementUpcomingRef,
    })
    const popularity = useQuery(['popularityData'], async () => fetchPopularity(Category.Movie), {
        staleTime: 60 * 1000,
        enabled: elementPopularityRef,
    })

    return (
        <div className='container-zero'>
            <Row
                title='Trending Movies'
                movies={trendingMovie.data?.movies}
                Thumbnail={Thumbnail2}
                isLoading={trendingMovie.isLoading}
            />
            <Row
                title='Continue watching'
                movies={nowPlaying.data?.movies}
                Thumbnail={Thumbnail3}
                isLoading={nowPlaying.isLoading}
            />

            <Row
                ref={topRatedRef}
                title='Top rated'
                movies={topRated.data?.movies}
                Thumbnail={Thumbnail1}
                isLoading={topRated.isLoading}
            />
            <Row
                ref={upcomingRef}
                title='Upcoming'
                movies={upcoming.data?.movies}
                Thumbnail={Thumbnail1}
                isLoading={upcoming.isLoading}
            />
            <Row
                ref={popularityRef}
                title='Popular'
                movies={popularity.data?.movies}
                Thumbnail={Thumbnail1}
                isLoading={popularity.isLoading}
            />
        </div>
    )
}

export default Container
