import {NextPage} from "next";
import Translate from "@components/Translate";
import Translated from "@components/Translated";

const Home: NextPage = () => {

    return (
        <div className="">
            <div className="flex justify-center items-center flex-col md:flex-row gap-4 md:pt-14 pb-14">
                <Translate/>
                <Translated/>
            </div>
        </div>
    )
}

export default Home;
