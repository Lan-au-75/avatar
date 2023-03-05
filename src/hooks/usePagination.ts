import {
    fetchAiringToDay,
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchTrendingMovie,
    fetchUpcoming,
} from '@/hooks/fetchApi'
import { useState } from 'react'
import { useQuery } from 'react-query'

function usePagination(category: string) {
    const [page, setPage] = useState<number>(1)
    // const [pageNowPlaying, setPageNowPlaying] = useState<number>(1)
    const [pageTopRated, setPageTopRated] = useState<number>(1)
    const [pageUpcoming, setPageUpcoming] = useState<number>(1)
    const [pagePopularity, setPagePopularity] = useState<number>(1)
    const [pageAiringToDay, setPageAiringToDay] = useState<number>(1)

    const trendingMovie = useQuery(
        ['trendingData', { page }],
        () => fetchTrendingMovie(category, page),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    const nowPlaying = useQuery(['nowPlayingData', { page }], async () => fetchNowPlaying(page), {
        staleTime: 60 * 1000, // 1 minute
        keepPreviousData: true,
    })

    const topRated = useQuery(
        ['topRatedData', { pageTopRated }],
        async () => fetchTopRated(category, pageTopRated),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    const upcoming = useQuery(
        ['upcomingData', { pageUpcoming }],
        async () => fetchUpcoming(pageUpcoming),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )
    const popularity = useQuery(
        ['popularityData', { pagePopularity }],
        async () => fetchPopularity(category, pagePopularity),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    const airingToDay = useQuery(
        ['airingToDayData', { pageAiringToDay }],
        async () => fetchAiringToDay(pageAiringToDay),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )
    return {
        trendingMovie,
        page,
        setPage,
        nowPlaying,

        topRated,
        pageTopRated,
        setPageTopRated,
        upcoming,
        pageUpcoming,
        setPageUpcoming,
        popularity,
        pagePopularity,
        setPagePopularity,
        airingToDay,
        pageAiringToDay,
        setPageAiringToDay,
    }
}

export default usePagination
