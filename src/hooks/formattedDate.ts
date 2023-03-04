import { Detail } from '@/types/movies.type'

export const formattedDate = (data: Detail) => {
    const date = new Date(data?.release_date! || data?.last_air_date!)
    const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric' })
    return formattedDate
}
