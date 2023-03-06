export function isActive(pageNumber: number | string, get: string) {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(get) === pageNumber.toString()
}
