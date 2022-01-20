export const formatDate = (date: Date | string): string => {
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
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString()

    return `${month} ${day}, ${year}`
}

export const readTime = (content: string): number => {
    return Math.ceil(content.trim().split(/\s+/).length / 225)
}
