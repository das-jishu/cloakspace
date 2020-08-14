
export interface Comment {
    key: string,
    date: Date,
    text: string,
    replies: Replies[],
}

export interface Replies {
    key: string,
    date: Date,
    text: string,
}