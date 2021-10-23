import { ContentType } from '../../types';

export const formatDate = (date: Date): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = date.getDate().toString();
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString();

    return `${month} ${day}, ${year}`;
}

export const mapPostContent = (postContent: ContentType) => {
    if (typeof postContent === 'string') return <p>{postContent}</p>;

    const { type, content } = postContent;

    switch(type) {
        case 'code':
            return <pre>{content}</pre>
        default:
            return <p>{content}</p>
    }
}