import {FC} from 'react';
import Image from "next/image";

const Navbar: FC = () => {
    return (
        <header>
            <nav className="py-6">
                <div className="w-24 h-4 relative">
                    <Image src='/logo.png' alt='logotype' layout="fill"/>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
