export function isPaginationActive(pageNumber: number | string) {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('page') === pageNumber.toString()
}
