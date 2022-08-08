import '@styles/globals.css';
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config';
import Layout from "@components/Layout";
import {AppProps} from "next/app";
import {MantineProvider} from "@mantine/core";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <DefaultSeo {...SEO}/>
            <MantineProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MantineProvider>
        </>
    )
}

export default MyApp
