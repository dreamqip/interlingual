import ky, {Options} from "ky-universal";

export default class TranslateApi {
    private static apiUrl: Request | string | URL = 'https://microsoft-translator-text.p.rapidapi.com/';

    static async fetchTranslation(text: string, language: string): Promise<any> {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            body: `[{"Text":"${text}"}]`
        };

        return await fetch(`${TranslateApi.apiUrl}translate?api-version=3.0&profanityAction=NoAction&textType=plain&to=${language}`, options).then(response => response.json());
    }

    static async fetchLanguages() {
        const options: Options = {
            headers: {
                'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
                'content-type': 'application/json',
            },
        };

        const json = await ky.get(`${TranslateApi.apiUrl}languages?api-version=3.0`, options).json();

        // const res = await fetch(`${TranslateApi.apiUrl}languages?api-version=3.0&scope=translation`, options);
        return json;
    }
}
