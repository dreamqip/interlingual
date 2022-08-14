import {FC, useEffect, useState} from 'react';
import useTranslateStore from "../store/translateStore";
import {Select} from "@mantine/core";
import {transformedLanguagesWithCode} from "../data/languanges";

export const SelectToLanguage: FC = () => {
    const {setToLanguage, toLanguage} = useTranslateStore();
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            setToLanguage(value);
        }
    }, [value, setToLanguage]);

    return (
        <Select
            data={transformedLanguagesWithCode}
            value={toLanguage ?? value}
            onChange={setValue}
            searchable
            placeholder="Select a language"
            nothingFound="No languages found"
            maxDropdownHeight={300}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            className="mb-4"
        />
    );
};

export const SelectFromLanguage: FC = () => {
    const {setFromLanguage, fromLanguage} = useTranslateStore();
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            setFromLanguage(value);
        }
    }, [value, setFromLanguage]);

    return (
        <Select
            data={transformedLanguagesWithCode}
            value={fromLanguage ?? value}
            onChange={setValue}
            searchable
            placeholder="Select a language"
            nothingFound="No languages found"
            maxDropdownHeight={300}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            className="mb-4"
        />
    );
}
