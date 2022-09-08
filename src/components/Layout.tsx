import {FC, PropsWithChildren, Suspense} from 'react';
import Navbar from "./Navbar";
import dynamic from "next/dynamic";
import {NotificationsProvider} from "@mantine/notifications";
import {MantineProvider} from "@mantine/core";

const MyCanvas = dynamic(() => import("@components/Canvas/Canvas"), {suspense: true});

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <MantineProvider>
                <NotificationsProvider autoClose={1500}>
                    <Suspense fallback={null}>
                        <MyCanvas/>
                    </Suspense>
                    <div className="container">
                        <Navbar/>
                        <main>
                            {children}
                        </main>
                    </div>
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
};

export default Layout;
