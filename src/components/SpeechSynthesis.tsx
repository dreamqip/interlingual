import {FC, useEffect, useState} from 'react';
import useTranslateStore from "@store/translateStore";
import {VolumeOffIcon, VolumeUpIcon} from "@heroicons/react/solid";
import {useSpeechSynthesis} from 'react-speech-kit';
import {Tooltip} from "@mantine/core";

const SpeechSynthesis: FC = () => {
    const {translation, toLanguage} = useTranslateStore();
    const {speak, cancel, speaking, voices} = useSpeechSynthesis({onEnd});
    const [voice, setVoice] = useState<string | null>(null);

    useEffect(() => {
        if (voices) {
            const voiceByLanguage = voices.find(({lang}: any) => lang.includes(toLanguage));
            setVoice(voiceByLanguage);
        }
    }, [toLanguage, voices]);

    function onEnd() {
        cancel();
    }

    const onSpeak = () => {
        speak({text: translation, voice});
    }

    const onCancel = () => {
        cancel();
    }

    return (
        <div className="flex">
            {speaking
                ? <Tooltip label="cancel" withArrow arrowSize={6}>
                    <div className="p-2 rounded-full hover:bg-slate-100 focus:bg-slate-100 transition-all">
                        <VolumeOffIcon
                            role="button"
                            onClick={onCancel}
                            className="w-6 h-6"
                        />
                    </div>
                </Tooltip>
                : <Tooltip label="listen" withArrow arrowSize={6}>
                    <div className="p-2 rounded-full hover:bg-slate-100 focus:bg-slate-100 transition-all">
                        <VolumeUpIcon
                            role="button"
                            onClick={onSpeak}
                            className="w-6 h-6"
                        />
                    </div>
                </Tooltip>
            }
        </div>
    );
};

export default SpeechSynthesis;
