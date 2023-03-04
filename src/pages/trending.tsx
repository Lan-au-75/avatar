import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { fetchTrendingMovie } from '@/hooks/fetchApi'
import usePagination from '@/hooks/usePagination'
import { Category, Movie } from '@/types/movies.type'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'

function Trending() {
    const { trendingMovie, pageTrending, setPageTrending } = usePagination(Category.Movie)

    if (trendingMovie.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={trendingMovie} page={pageTrending} setPage={setPageTrending} />
}

export default Trending
