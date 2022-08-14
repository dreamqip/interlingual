import '@styles/globals.css';
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config';
import Layout from "@components/Layout";
import {AppProps} from "next/app";
import {MantineProvider} from "@mantine/core";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useState} from "react";
import {NotificationsProvider} from "@mantine/notifications";


function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}}));

    return (
        <>
            <DefaultSeo {...SEO}/>
            <QueryClientProvider client={queryClient}>
                <MantineProvider>
                    <NotificationsProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </NotificationsProvider>
                </MantineProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>

        </>
    )
}

export default MyApp;
