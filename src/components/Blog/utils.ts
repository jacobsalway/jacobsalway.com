export const formatDate = (date: Date | string, full = true): string => {
    date = typeof date === 'string' ? new Date(date) : date

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const day = date.getDate()
    const month = full
        ? months[date.getMonth()]
        : months[date.getMonth()].slice(0, 3)
    const year = date.getFullYear().toString()

    return `${month} ${day}, ${year}`
}

export const readTime = (content: string): number => {
    return Math.ceil(content.trim().split(/\s+/).length / 225)
}