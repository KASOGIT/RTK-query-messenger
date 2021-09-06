import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import type { AppProps as NextAppProps } from 'next/app';
import { Provider } from 'react-redux';

import getTheme from 'styles/theme/theme';
import createEmotionCache from 'styles/createEmotionCache';
import { store } from 'redux/store';

import 'styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface AppProps {
  children: React.ReactNode;
  Component: React.ComponentType<any>;
  emotionCache?: EmotionCache;
  pageProps: NextAppProps;
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>RTK query messenger</title>
        <meta name="description" content="RTK query messenger" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
