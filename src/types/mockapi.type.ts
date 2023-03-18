export interface ListMovie {
    id: number
    title: string
    post_path: string
}

export type FormState = Omit<ListMovie, 'id'> | ListMovie
