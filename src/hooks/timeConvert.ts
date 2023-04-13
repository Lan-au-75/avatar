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

const currentTime = () => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    const time = hours + ':' + minutes

    return time
}

export { currentTime }

export default timeConvert
