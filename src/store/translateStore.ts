import create from "zustand";
import {devtools, persist} from "zustand/middleware";


export interface TranslateState {
    language: string;
    availableLanguages: string[];
    setLanguage: (language: string) => void;
    setAvailableLanguages: (availableLanguages: string[]) => void;
}

const useTranslateStore = create<TranslateState>()(
    devtools(
        persist(
            (set) => ({
                language: 'en',
                availableLanguages: [],
                setLanguage: (language: string) => set({language}),
                setAvailableLanguages: (availableLanguages: string[]) => set({availableLanguages})
            })
        )
    )
)

export default useTranslateStore;


