import {FC} from 'react';
import {createSpeechlySpeechRecognition} from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {MicrophoneIcon, TranslateIcon} from "@heroicons/react/solid";
import {Transition} from "@mantine/core";
import {showNotification} from "@mantine/notifications";

const appId = `${process.env.NEXT_PUBLIC_SPEECHLY_APP_ID}`;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone: FC = () => {

    const {
        transcript,
        listening,
        isMicrophoneAvailable
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({continuous: true});

    if (!isMicrophoneAvailable) {
        showNotification({
            message: 'Microphone is not available',
            color: 'red'
        })
    }

    return (
        <div>
            <Transition
                mounted={listening}
                transition="slide-left"
                duration={200}
                timingFunction="ease"
            >
                {styles => <TranslateIcon style={styles} className="w-4 h-4"/>}
            </Transition>
            <Transition
                mounted={!listening}
                transition="slide-left"
                duration={400}
                timingFunction="ease"
            >
                {styles => <MicrophoneIcon style={styles} className="w-4 h-4"/>}
            </Transition>
            <button
                onTouchStart={startListening}
                onMouseDown={startListening}
                onTouchEnd={SpeechRecognition.stopListening}
                onMouseUp={SpeechRecognition.stopListening}
            >Hold to talk
            </button>
            <p>{transcript}</p>
        </div>
    );
};

export default Dictaphone;
