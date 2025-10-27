export interface User {
    id: number
    name: string
    password: string
    createdAt: number
}

export interface Database {
    users: User[]
}