import {FC, useEffect} from 'react';
import {Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import TranslateApi from "@services/translate.api";
import useTranslateStore from "../store/translateStore";

const SelectLanguage: FC = () => {
    const {setAvailableLanguages, availableLanguages} = useTranslateStore();

    const {data: languages, isError} = useQuery(['languages'], () => TranslateApi.fetchLanguages());

    useEffect(() => {
        if (languages) {
            setAvailableLanguages(languages)
            console.log(languages)
        }
    }, [languages, setAvailableLanguages]);

    if (isError) {
        return <div>An error occurred</div>
    }

    return (
        /*<Select

        />*/
        <div>dasd</div>
    );
};

export default SelectLanguage;
