import {
    fetchTrendingMovie,
    fetchNowPlaying,
    fetchTopRated,
    fetchUpcoming,
    fetchPopularity,
    fetchAiringToDay,
} from '@/hooks/fetchApi'
import { useQuery } from 'react-query'
import { useState } from 'react'

function usePagination(category: string) {
    const [pageTrending, setPageTrending] = useState<number>(1)
    const [pageNowPlaying, setPageNowPlaying] = useState<number>(1)
    const [pageTopRated, setPageTopRated] = useState<number>(1)
    const [pageUpcoming, setPageUpcoming] = useState<number>(1)
    const [pagePopularity, setPagePopularity] = useState<number>(1)
    const [pageAiringToDay, setPageAiringToDay] = useState<number>(1)

    const trendingMovie = useQuery(
        ['trendingData', { pageTrending }],
        () => fetchTrendingMovie(category, pageTrending),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    const nowPlaying = useQuery(
        ['nowPlayingData', { pageNowPlaying }],
        async () => fetchNowPlaying(pageNowPlaying),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

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
        pageTrending,
        setPageTrending,
        nowPlaying,
        pageNowPlaying,
        setPageNowPlaying,
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
