export const ApiKey = import.meta.env.VITE_IMDB_API_kEY

const requests = {
    requestTrending: `trending/movie/day?api_key=${ApiKey}`,
    requestPopular: `movie/popular?api_key=${ApiKey}&language=en-US`,
    requestNowPlaying: `movie/now_playing?api_key=${ApiKey}&language=en-US`,
    requestTopRated: `movie/top_rated?api_key=${ApiKey}&language=en-US`,
    requestUpcoming: `movie/upcoming?api_key=${ApiKey}&language=en-US`,
}

export const baseUrl = 'https://image.tmdb.org/t/p/original'
export default requests
