export type Cart = {
    _id: string
    _user: string[]
    items: Item[]
    __v: number
}

export type Item = {
    name: string
    quantity: number
    unit: string
}
