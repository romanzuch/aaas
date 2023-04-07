import axios from 'axios';
import { QuoteError } from '../helpers/Quote';

class AnimeSelectorComponent {
    animeListUrl: string = 'https://animechan.vercel.app/api/available/anime';
    anime: string = '';

    async returnAnimeList(): Promise<Array<string> | QuoteError> {
        try {
            const response = await axios.get(this.animeListUrl);
            const data = response.data;
            return data;
        } catch (error) {
            const quoteError: QuoteError = {
                message: 'An error occured catching the anime list.',
                code: 1
            }
            return quoteError;
        }
    }
}

export default AnimeSelectorComponent;