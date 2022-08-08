import {TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import axios from "axios";
import NLPCloudClient from 'nlpcloud'

const client = new NLPCloudClient('nllb-200-3-3b', 'a174e017a602ee75482aa19a651c9c0f6854675a', true)

export default function Home() {
    const [value, setValue] = useState<string>('');
    const [data, setData] = useState<any>();
    const [debounced] = useDebouncedValue(value, 500);


    const fetchTranslate = async () => {
        /*const res = await axios.post(`https://cors-anywhere.herokuapp.com/https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_PUBLIC_AUTH_KEY}&text=${debounced}&target_lang=DE`, {
            text: debounced,
            'target_lang': 'DE',
            auth_key: process.env.NEXT_PUBLIC_AUTH_KEY
        }, {
        })*/

        const res = await axios.post(`https://cors-anywhere.herokuapp.com/https://api.nlpcloud.io/v1/nllb-200-3-3b/translation`, {
            body: debounced,
            target: 'deu_Latn',
        }, {
            headers: {
                Authorization: 'TOKEN a174e017a602ee75482aa19a651c9c0f6854675a'
            }
        })

        setData(res)
        console.log(res.data)
    }

    useEffect(() => {
        // fetchTranslate();
        client.translation(debounced).then(console.log)
    }, [debounced])

    return (
        <div className="">
            <TextInput value={value} onChange={(e) => setValue(e.currentTarget.value)}/>

            <div>Value: {debounced}</div>
        </div>
    )
}
