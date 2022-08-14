import ky, {Options} from "ky-universal";

export default class TranslateApi {
    private static apiUrl: string | URL = 'https://microsoft-translator-text.p.rapidapi.com/';

    static async fetchTranslation(text: string, fromLanguage: string = '', toLanguage: string): Promise<any> {
        if (!text || !toLanguage) {
            return;
        }

        const options: Options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            body: `[{"Text":"${text}"}]`
        };

        const url = new URL(`translate?from=${fromLanguage}&to=${toLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`, TranslateApi.apiUrl);

        return await ky.post(`${url}`, options).json();

    }
}
