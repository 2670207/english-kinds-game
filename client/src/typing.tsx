export type CardTypeInterface = {
    _id: string,
    audioSrc: string,
    word: string,
    image: string,
    translation: string,
    category: string, 
    clicks?: string,
    correct?: string,
    wrong?: string,
    perSent?: string,
    status? : string,
}
export type CategoryTypeInterface = {
    _id: string,
    name: string,
    image: string,
}