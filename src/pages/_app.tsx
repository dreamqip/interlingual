import '@styles/globals.css';
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config';
import {AppProps} from "next/app";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useState} from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@components/Layout"));

function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}}));

    return (
        <>
            <DefaultSeo {...SEO}/>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </>
    )
}

export default MyApp;
