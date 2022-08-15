import {FC, useEffect, useState} from 'react';
import {SelectFromLanguage} from "@components/SelectLanguage";
import {Textarea} from "@mantine/core";
import {useDebouncedValue} from "@mantine/hooks";
import useTranslateStore from "@store/translateStore";
import dynamic from "next/dynamic";

const Dictaphone = dynamic(() => import("@components/Dictaphone"), {ssr: false});

const Translate: FC = () => {
    const {setText, text, setTranslation} = useTranslateStore();
    const [value, setValue] = useState<string>('');
    const [debounced] = useDebouncedValue(value, 1000);

    useEffect(() => {
        if (debounced) {
            setText(value.toLowerCase());
        }

        if (!text) {
            setTranslation('');
        }
    }, [debounced, setText, value, text, setTranslation]);

    return (
        <div className="w-full md:w-[50%] relative bg-slate-50 p-4 rounded-2xl shadow">
            <SelectFromLanguage/>
            <Textarea
                autosize
                aria-label="Translate text"
                minRows={6}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                variant="unstyled"
            />
            <Dictaphone/>
        </div>
    );
};

export default Translate;
