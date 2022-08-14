import create from "zustand";
import {devtools} from "zustand/middleware";

export interface TranslateState {
    fromLanguage: string;
    toLanguage: string;
    text: string;
    translation: string;
    setFromLanguage: (language: string) => void;
    setToLanguage: (language: string) => void;
    setText: (text: string) => void;
    setTranslation: (translation: string) => void;
}

const useTranslateStore = create<TranslateState>()(
    devtools(
        (set) => ({
            fromLanguage: '',
            toLanguage: '',
            text: '',
            translation: '',
            setFromLanguage: (fromLanguage: string) => set({fromLanguage}),
            setToLanguage: (toLanguage: string) => set({toLanguage}),
            setText: (text: string) => set({text}),
            setTranslation: (translation: string) => set({translation})
        })
    )
)

export default useTranslateStore;


