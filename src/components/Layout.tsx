import {FC, PropsWithChildren} from 'react';
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="container">
            <Navbar/>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
