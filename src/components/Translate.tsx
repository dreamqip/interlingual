import {FC, useEffect, useState} from 'react';
import {SelectFromLanguage} from "@components/SelectLanguage";
import {Textarea} from "@mantine/core";
import {useDebouncedValue} from "@mantine/hooks";
import useTranslateStore from "@store/translateStore";

const Translate: FC = () => {
    const {setText} = useTranslateStore();
    const [value, setValue] = useState<string>('');
    const [debounced] = useDebouncedValue(value, 1000);

    useEffect(() => {
        if (debounced) {
            setText(value);
        }
    }, [debounced, setText, value]);

    return (
        <div className="w-[50%]">
            <SelectFromLanguage/>
            <Textarea
                autosize
                aria-label="Translate text"
                minRows={6}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
        </div>
    );
};

export default Translate;
