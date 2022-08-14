import {FC, useEffect} from 'react';
import {createSpeechlySpeechRecognition} from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {MicrophoneIcon, TranslateIcon} from "@heroicons/react/solid";
import {Tooltip, Transition} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import useTranslateStore from "@store/translateStore";

/*const appId = `${process.env.NEXT_PUBLIC_SPEECHLY_APP_ID}`;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);*/

const Dictaphone: FC = () => {
    const {setText, fromLanguage} = useTranslateStore();

    console.log(fromLanguage);

    const {
        transcript,
        listening,
        isMicrophoneAvailable,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({continuous: true, language: fromLanguage});

    useEffect(() => {
        if (!isMicrophoneAvailable) {
            showNotification({
                message: 'Microphone is not available',
                color: 'red'
            })
        }

        if (!browserSupportsSpeechRecognition) {
            showNotification({
                message: 'Your browser does not support speech recognition',
                color: 'red'
            })
        }
    }, [isMicrophoneAvailable, browserSupportsSpeechRecognition]);

    useEffect(() => {
        if (transcript) {
            setText(transcript.toLowerCase());
        }

        if (!listening && transcript) {
            resetTranscript();
        }
    }, [transcript, setText, resetTranscript, listening]);

    return (
        <div>
            <Transition
                mounted={listening}
                transition="slide-left"
                duration={200}
                timingFunction="ease"
            >
                {styles =>
                    <TranslateIcon
                        role="button"
                        onTouchEnd={SpeechRecognition.stopListening}
                        onMouseUp={SpeechRecognition.stopListening}
                        style={styles}
                        className="w-8 h-8"/>
                }
            </Transition>
            <Transition
                mounted={!listening}
                transition="slide-left"
                duration={400}
                timingFunction="ease"
            >
                {styles =>
                    <Tooltip label="hold to translate by voice" withArrow arrowSize={6}>
                        <MicrophoneIcon
                            role="button"
                            onTouchStart={startListening}
                            onMouseDown={startListening}
                            style={styles}
                            className="w-8 h-8"/>
                    </Tooltip>
                }
            </Transition>
        </div>
    );
};

export default Dictaphone;
