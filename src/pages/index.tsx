import {NextPage} from "next";
import Translate from "@components/Translate";
import Translated from "@components/Translated";
import dynamic from "next/dynamic";

const Dictaphone = dynamic(() => import("@components/Dictaphone"), {ssr: false});

const Home: NextPage = () => {

    return (
        <div className="">
            <div className="flex gap-4">
                <Translate/>
                <Translated/>
            </div>
            <Dictaphone/>
        </div>
    )
}

export default Home;
