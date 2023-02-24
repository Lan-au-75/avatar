import {
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchTrendingMovie,
    fetchUpcoming,
} from '@/hooks/fetchApi'
import { useQuery } from 'react-query'

import Row from './Row'
import Thumbnail1 from './Thumbnail1'
import Thumbnail2 from './Thumbnail2'
import Thumbnail3 from './Thumbnail3'

function Container() {
    const trendingMovie = useQuery(['trendingData'], () => fetchTrendingMovie())
    const nowPlaying = useQuery(['nowPlayingData'], async () => fetchNowPlaying())
    const topRated = useQuery(['topRatedData'], async () => fetchTopRated())
    const upcoming = useQuery(['upcomingData'], async () => fetchUpcoming())
    const popularity = useQuery(['popularityData'], async () => fetchPopularity())

    return (
        <main className='container'>
            <Row
                title='Trending Movies'
                movies={trendingMovie.data}
                Thumbnail={Thumbnail2}
                isLoading={trendingMovie.isLoading}
            />
            <Row
                title='Continue watching'
                movies={nowPlaying.data}
                Thumbnail={Thumbnail3}
                isLoading={nowPlaying.isLoading}
            />
            <Row
                title='Top rated'
                movies={topRated.data}
                Thumbnail={Thumbnail1}
                isLoading={topRated.isLoading}
            />
            <Row
                title='Upcoming'
                movies={upcoming.data}
                Thumbnail={Thumbnail1}
                isLoading={upcoming.isLoading}
            />
            <Row
                title='Popular'
                movies={popularity.data}
                Thumbnail={Thumbnail1}
                isLoading={popularity.isLoading}
            />
        </main>
    )
}

export default Container
