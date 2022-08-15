import {FC, PropsWithChildren, Suspense} from 'react';
import Navbar from "./Navbar";
import dynamic from "next/dynamic";

const MyCanvas = dynamic(() => import("@components/Canvas/Canvas"), {suspense: true});

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <Suspense fallback={null}>
                <MyCanvas/>
            </Suspense>
            <div className="container">
                <Navbar/>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;
