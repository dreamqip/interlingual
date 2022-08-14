import {NextPage} from "next";
import Translate from "@components/Translate";
import Translated from "@components/Translated";

const Home: NextPage = () => {

    return (
        <div className="">
            <div className="flex gap-4">
                <Translate/>
                <Translated/>
            </div>
        </div>
    )
}

export default Home;
