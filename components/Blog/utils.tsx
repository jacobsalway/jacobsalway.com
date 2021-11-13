export const formatDate = (date: Date): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = date.getDate().toString();
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString();

    return ` ${day} ${month}, ${year}`;
}

export const readTime = (content: string): number => {
    return Math.ceil(content.trim().split(/\s+/).length / 225)
}