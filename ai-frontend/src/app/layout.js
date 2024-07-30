"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/theme.css';

const getThemeFromCSSVariables = () => {
  const primaryMain = getComputedStyle(document.documentElement).getPropertyValue('--primary-main').trim() || '#5d6f19';
  const primaryDark = getComputedStyle(document.documentElement).getPropertyValue('--primary-dark').trim() || '#435012';
  const primaryLight = getComputedStyle(document.documentElement).getPropertyValue('--primary-light').trim() || '#768e22';
  const secondaryMain = getComputedStyle(document.documentElement).getPropertyValue('--secondary-main').trim() || '#d2e603';
  const secondaryDark = getComputedStyle(document.documentElement).getPropertyValue('--secondary-dark').trim() || '#99a102';
  const secondaryLight = getComputedStyle(document.documentElement).getPropertyValue('--secondary-light').trim() || '#e4f740';
  const textPrimary = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#ffffff';
  const textSecondary = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#000000';

  return createTheme({
    palette: {
      primary: {
        main: primaryMain,
        dark: primaryDark,
        light: primaryLight,
        contrastText: textPrimary,
      },
      secondary: {
        main: secondaryMain,
        dark: secondaryDark,
        light: secondaryLight,
        contrastText: textSecondary,
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontFamily: 'Inter, sans-serif',
      },
      h2: {
        fontFamily: 'Inter, sans-serif',
      },
      h3: {
        fontFamily: 'Inter, sans-serif',
      },
      h4: {
        fontFamily: 'Inter, sans-serif',
      },
      h5: {
        fontFamily: 'Inter, sans-serif',
      },
      h6: {
        fontFamily: 'Inter, sans-serif',
      },
      subtitle1: {
        fontFamily: 'Inter, sans-serif',
      },
      subtitle2: {
        fontFamily: 'Inter, sans-serif',
      },
    },
  });
};

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTheme = () => {
      setTheme(getThemeFromCSSVariables());
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') {
      loadTheme();
    } else {
      window.addEventListener('load', loadTheme);
      return () => window.removeEventListener('load', loadTheme);
    }
  }, []);

  if (!isLoaded) {
    return (
      <html lang="en">
        <Head>
          <title>budbem</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--background-screen)' }}>
            <CircularProgress sx={{ color: 'var(--primary-main)' }} />
          </Box>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <Head>
        <title>My Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
