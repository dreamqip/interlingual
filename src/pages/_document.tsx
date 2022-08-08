import Document, {Head, Html, Main, NextScript} from "next/document";
import {createGetInitialProps} from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class MyDocument extends Document {
    static getInitialProps = getInitialProps;

    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=optional" rel="stylesheet"/>
                </Head>
                <body className="antialiased">
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
