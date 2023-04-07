import axios from 'axios';
import { QuoteError, QuoteObject } from './helpers/Quote';
import * as React from 'react';

class AppComponent {
    
    async returnQuote(animeName: string): Promise<QuoteObject | QuoteError> {
        console.log(animeName);
        try {
            const url = animeName === "" ? 'https://animechan.vercel.app/api/random' : `https://animechan.vercel.app/api/random/anime?title=${animeName}`
            const response = await axios.get(url);
            const data = response.data;
            return new QuoteObject(data.quote, data.character, data.anime);
        } catch (error) {
            const quoteError: QuoteError = {
                message: 'An error occurred catching the anime quote.',
                code: 0,
            };
            return quoteError;
        }
    }

    shareToTwitter(text: string): void {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=600,height=300');
    }

    shareToReddit(title: string, subreddit: string = "anime"): void {
        const url = `https://www.reddit.com/r/${subreddit}/submit?title=${encodeURIComponent(title)}`;
        window.open(url, '_blank', 'width=600,height=300');
    }
      
}

export default AppComponent;