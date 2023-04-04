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
    requestAiringToDay: `https://api.themoviedb.org/3/trending/tv/day?api_key=${ApiKey}`,

    requestDetail(id: number | string, category: string) {
        return `${category}/${id}?api_key=${ApiKey}`
    },

    requestGetVideo(id: number | string, category: string) {
        return `${category}/${id}/videos?api_key=${ApiKey}`
    },

    requestReview(id: number, category: string) {
        return `${category}/${id}/reviews?api_key=${ApiKey}`
    },

    requestSearch(query: string) {
        return `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${query}&language=en-US`
    },

    requestGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}&language=en-US`,

    requestSearchAPI(query: string) {
        return `https://server-avatar.vercel.app/api/v1/search/users?query=${query}`
    },
}

export const baseUrl = 'https://image.tmdb.org/t/p/original'
export default requests
