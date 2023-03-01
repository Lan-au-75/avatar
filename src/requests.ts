const ApiKey = import.meta.env.VITE_IMDB_API_kEY

const requests = {
    requestTrending(category: string) {
        return `trending/${category}/day?api_key=${ApiKey}`
    },
    requestTopRated(category: string) {
        return `${category}/top_rated?api_key=${ApiKey}`
    },
    requestPopular(category: string) {
        return `${category}/popular?api_key=${ApiKey}`
    },
    requestNowPlaying: `movie/now_playing?api_key=${ApiKey}`,
    requestUpcoming: `movie/upcoming?api_key=${ApiKey}`,
    requestAiringToDay: `tv/airing_today?api_key=${ApiKey}`,
}

export const baseUrl = 'https://image.tmdb.org/t/p/original'
export default requests
