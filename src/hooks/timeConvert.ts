function timeConvert(time: number) {
    const hour = Math.floor(time / 60)

    const minute = time % 60

    if (time === 0) return

    if (hour === 0) {
        return `${minute}m`
    }

    if (minute === 0) {
        return `${hour}h`
    }

    return `${hour}h ${minute}m`
}

export default timeConvert
