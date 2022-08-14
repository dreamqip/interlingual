import {FC, useEffect} from 'react';
import {Textarea, Tooltip} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import TranslateApi from "@services/translate.api";
import useTranslateStore from "@store/translateStore";
import {SelectToLanguage} from "@components/SelectLanguage";
import {showNotification, updateNotification} from "@mantine/notifications";
import {CheckIcon, ClipboardCopyIcon, ClipboardIcon} from "@heroicons/react/solid";
import {useClipboard} from "@mantine/hooks";

const Translated: FC = () => {
    const {fromLanguage, toLanguage, text, setTranslation, translation} = useTranslateStore();
    const clipboard = useClipboard({timeout: 500});

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
    }, [isFetching, isFetched]);

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

    useEffect(() => {
        if (translate) {
            setTranslation(translate[0]?.translations[0]?.text);
        }
    }, [setTranslation, translate]);

    const onCopy = () => {
        clipboard.copy(translation);
        showNotification({
            message: 'Copied to clipboard',
            color: 'teal',
            icon: <ClipboardCopyIcon className="w-6 h-6 accent-green-500"/>,
        })
    }

    return (
        <div className="w-[50%] bg-slate-50 p-4 rounded-2xl shadow">
            <SelectToLanguage/>
            <Textarea
                autosize
                placeholder={'Translation'}
                aria-label="Translated text"
                minRows={6}
                value={translation}
                readOnly
                variant="unstyled"
            />
            {translation && (
                <Tooltip label="copy to clipboard">
                    <ClipboardIcon
                        onClick={onCopy}
                        role="button"
                        className="w-6 h-6 accent-green-500"
                    />
                </Tooltip>
            )}
        </div>
    );
};

export default Translated;
