import Languages from "./languages";
import { shuffle } from "./utilits";

export interface TranslatorData {
    word: string;
    lang: string;
}

export type TranslatorResult = { [key: string]: Array<string> };

async function translate(
    srcLang: string,
    tarLang: string,
    text: string
): Promise<TranslatorData> {
    let url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
        Languages[srcLang] +
        "&tl=" +
        Languages[tarLang] +
        "&dt=t&q=" +
        encodeURI(text);
    let res = await fetch(url);
    let json = await res.json();
    let result = "";
    json[0].forEach((row: any) => (result += row[0]));
    return { word: result, lang: tarLang };
}

export default class Translator {
    public queue: Array<string> = [];
    public word: string;
    public lang: string;

    constructor(word: string, lang: string = "English") {
        this.queue = shuffle(
            Object.keys(Languages).filter((ele) => ele !== lang)
        );

        this.word = word;
        this.lang = lang;
    }

    async translate(): Promise<TranslatorResult> {
        const raw = await Promise.all(
            this.queue.map((lang) => translate(this.lang, lang, this.word))
        );

        const arr = raw
            .filter((ele) => /^[a-zA-Z ]+$/.test(ele.word))
            .sort((a, b) => a.word.length - b.word.length);
        const dict: TranslatorResult = {};
        arr.forEach((ele) => {
            if (dict[ele.word]) {
                dict[ele.word].push(ele.lang);
            } else {
                dict[ele.word] = [ele.lang];
            }
        });
        return dict;
    }
}
