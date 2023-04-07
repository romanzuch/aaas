interface Quote {
    quote: string,
    character: string,
    anime: string
}

export class QuoteObject {

    public quote: string
    public character: string
    public anime: string

    constructor(quote: string, character: string, anime: string) {
        this.quote = quote
        this.character = character
        this.anime = anime
    }
}

export interface QuoteError {
    message: string,
    code: number
}