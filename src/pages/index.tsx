import {Textarea} from "@mantine/core";
import {useEffect, useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import {NextPage} from "next";
import {useQuery} from "@tanstack/react-query";
import TranslateApi from "@services/translate.api";
import SelectLanguage from "@components/SelectLanguage";

const Home: NextPage = () => {
    const [value, setValue] = useState<string>('Hello');
    const [data, setData] = useState<any>(null);
    const [debounced] = useDebouncedValue(value, 1000);

    const {
        data: translate,
        isLoading,
        error
    } = useQuery(['translate', debounced], () => TranslateApi.fetchTranslation(debounced, 'pt'));

    useEffect(() => {
        if (translate) {
            setData(translate)
        }
    }, [debounced, translate]);

    return (
        <div>
            <>
                <SelectLanguage/>
                <Textarea
                    autosize
                    placeholder="Autosize with no rows limit"
                    label="Type something"
                    minRows={6}
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />

                {translate &&
                    <div>Data: {data && data[0]?.translations.map((translate: any) => {
                        return <span key={translate.text}>{translate.text}</span>
                    })}
                    </div>
                }
            </>
        </div>
    )
}

export default Home;
