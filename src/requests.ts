export const INIT_PAGE = 1

export const QUERY = 'a'

export const ApiKey = import.meta.env.VITE_IMDB_API_kEY

const requests = {
    requestTrending: `trending/movie/day?api_key=${ApiKey}`,
    requestPopular: `movie/popular?api_key=${ApiKey}&language=en-US&page=${INIT_PAGE}`,
    requestNowPlaying: `movie/now_playing?api_key=${ApiKey}&language=en-US&page=${INIT_PAGE}`,
    requestTopRated: `movie/top_rated?api_key=${ApiKey}&language=en-US&page=${INIT_PAGE}`,
    requestUpcoming: `movie/upcoming?api_key=${ApiKey}&language=en-US&page=${INIT_PAGE}`,
}

export const baseUrl = 'https://image.tmdb.org/t/p/original'
export default requests
