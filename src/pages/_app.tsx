import '@/styles/globals.scss';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import theme from './../MUITheme';


export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
