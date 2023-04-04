export interface ListUser {
    _id: number
    name: string
    email: string
}

export interface DetailUser extends ListUser {
    phone: string
}

export type FormState = Omit<DetailUser, '_id'> | DetailUser
