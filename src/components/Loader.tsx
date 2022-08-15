import {FC} from 'react';
import {Loader as MantineLoader} from '@mantine/core';

const Loader: FC = () => {
    return (
        <div className="flex justify-center relative z-10 items-center h-screen">
            <MantineLoader color="indigo" variant="bars"/>
        </div>
    );
};

export default Loader;
