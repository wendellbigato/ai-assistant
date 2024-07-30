/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import Header from '../../components/Header/Header';
import Manutencao from '../../components/Manutencao/Manutencao';  // Import the maintenance component
import axios from 'axios';
import '../../styles/theme.css';

const getCSSVariable = (variable) => {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    return value || '#000000';
  }
  return '#000000';
};

const createCustomTheme = () => {
  const primaryMain = getCSSVariable('--primary-main');
  const primaryDark = getCSSVariable('--primary-dark');
  const primaryLight = getCSSVariable('--primary-light');
  const secondaryMain = getCSSVariable('--secondary-main');
  const secondaryDark = getCSSVariable('--secondary-dark');
  const secondaryLight = getCSSVariable('--secondary-light');
  const textPrimary = getCSSVariable('--text-primary');
  const textSecondary = getCSSVariable('--text-secondary');
  const fontFamilyPrimary = getCSSVariable('--font-family-primary');
  const fontFamilySecondary = getCSSVariable('--font-family-secondary');

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
      fontFamily: fontFamilySecondary,
      h1: {
        fontFamily: fontFamilyPrimary,
      },
      h2: {
        fontFamily: fontFamilyPrimary,
      },
      h3: {
        fontFamilyPrimary,
      },
      h4: {
        fontFamilyPrimary,
      },
      h5: {
        fontFamilyPrimary,
      },
      h6: {
        fontFamilyPrimary,
      },
    },
  });
};

export default function ApiDocumentation() {
  const [theme, setTheme] = useState(createCustomTheme());
  const [userName, setUserName] = useState('');
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    const customTheme = createCustomTheme();
    setTheme(customTheme);

    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users?userId=${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
            }
          });
          const user = response.data;
          setUserName(user.nome);
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <TokenVerification>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {!isMobile && <Navbar />}
            <Box
              component="main"
              sx={{
                backgroundColor: '#FFFFFF',
                flexGrow: 1,
                overflow: 'auto',
                mt: { xs: '0px', sm: '0px' }
              }}
            >
              <Header userName={userName} />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Manutencao />  {/* Display the maintenance component */}
              </Container>
              {isMobile && <MenuMobile theme={theme} />}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
