import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { PostProps } from '../types'

const postsDir = path.join(process.cwd(), 'posts')

export const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDir)
    return fileNames.map(fileName => fileName.replace(/\.md$/, ''))
}

export const getPostData = async (id: string) => {
    const fullPath = path.join(postsDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
        id,
        content: matterResult.content,
        ...matterResult.data
    } as PostProps
}

export const getAllPosts = async () => {
    const postIds = getAllPostIds()
    const allPosts = postIds.map(postId => getPostData(postId))
    return await Promise.all(allPosts)
}