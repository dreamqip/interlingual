import {Suspense} from "react";
import {NextPage} from "next";
import dynamic from "next/dynamic";
import Loader from "@components/Loader";

const Translate = dynamic(() => import("@components/Translate"), {suspense: true});
const Translated = dynamic(() => import("@components/Translated"), {suspense: true});

const Home: NextPage = () => {
    return (
        <div>
            <div className="flex justify-center flex-col md:flex-row gap-4 py-10 md:py-14">
                <Suspense fallback={<Loader/>}>
                    <Translate/>
                    <Translated/>
                </Suspense>
            </div>
        </div>
    )
}

export default Home;
