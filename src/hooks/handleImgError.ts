export const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    src: string = '/no-img.png'
) => {
    ;(e.target as HTMLImageElement).src = src
}
