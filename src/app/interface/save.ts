export interface saveInterface{
    title : string,
    subject : string,
    createdAt : string,
    items : {
        id : string,
        item : string,
        definition : string
    }[]
}