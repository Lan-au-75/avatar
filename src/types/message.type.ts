export interface CommentData {
    _id: string
    parentId: string | null
    userId: string | undefined
    name: string
    avatar: string
    message: string
    like: number | undefined
    room: string | undefined
    createdAt?: string
    updatedAt?: string
}

export type CreateCommentData = Omit<CommentData, '_id'>
