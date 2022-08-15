import {FC} from 'react';
import Image from "next/image";

const Navbar: FC = () => {
    return (
        <header className="bg-slate-50 absolute w-full left-0 top-0">
            <nav className="py-6 px-12">
                <div className="w-24 h-4 relative">
                    <Image src='/logo.png' alt='logotype' layout="fill"/>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
