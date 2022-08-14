import {FC, useEffect} from 'react';
import {Textarea} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import TranslateApi from "@services/translate.api";
import useTranslateStore from "@store/translateStore";
import {SelectToLanguage} from "@components/SelectLanguage";
import {showNotification, updateNotification} from "@mantine/notifications";
import {CheckIcon} from "@heroicons/react/solid";

const Translated: FC = () => {
    const {fromLanguage, toLanguage, text} = useTranslateStore();
    const {
        data: translate,
        isFetching,
        isFetched,
    } = useQuery(['translate', text, toLanguage], () =>
        TranslateApi.fetchTranslation(text, fromLanguage, toLanguage), {enabled: !!text && !!toLanguage});

    useEffect(() => {
        if (isFetching && !isFetched) {
            showNotification({
                id: 'load-data',
                loading: true,
                title: 'Translating...',
                message: 'Please wait...',
                autoClose: false,
                disallowClose: true,
                color: 'blue',
            })
        }
    }, [isFetching]);

    useEffect(() => {
        if (isFetched) {
            updateNotification({
                id: 'load-data',
                color: 'teal',
                title: 'Translated successfully',
                message: 'Notification will close in 2 seconds, you can close this notification now',
                icon: <CheckIcon className="w-8 h-8 accent-green-500"/>,
                autoClose: 2000,
            })
        }
    }, [isFetched]);

    return (
        <div className="w-[50%]">
            <SelectToLanguage/>
            <Textarea
                autosize
                placeholder={'Translation'}
                aria-label="Translated text"
                minRows={6}
                value={translate && translate[0]?.translations[0]?.text}
                readOnly
            />
        </div>
    );
};

export default Translated;
