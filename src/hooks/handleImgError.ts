export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    ;(e.target as HTMLImageElement).src = '/no-img.png'
}
