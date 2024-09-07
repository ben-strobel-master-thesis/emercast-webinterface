import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppWrapper from '@/components/layout/AppWrapper';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Emercast</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Notifications position="top-right" />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </MantineProvider>
  );
}
