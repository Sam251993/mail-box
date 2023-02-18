export interface User {
    email: string | null,
    name: string,
    password: string,
    id: string
}
export interface Message {
    _id: string,
    email: string,
    from_id: string,
    from_email: string,
    to_id: string,  
    to_email: string,
    title: string,
    text: string,
    date: Date,
    answered_to_id: string,
    conversation_id?: string
}
export interface Conversations {
    _id: string,
    title: string,
    date: Date
}

export enum View {
    Month = "Month",
    Year = "Year",
    Hour = "Hour",
    Minute = 'Minute'
}