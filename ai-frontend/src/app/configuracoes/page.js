"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import '../../styles/theme.css';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Skeleton from '@mui/material/Skeleton';
import Header from '../../components/Header/Header';
import axios from 'axios';

const getCSSVariable = (variable) => {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    return value || '#000000'; // Valor padrão para prevenir erros
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

export default function Configuracoes() {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
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

    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula o carregamento de dados por 2 segundos
  }, []);

  if (!theme) {
    return null; // ou um spinner/carregamento enquanto o tema é criado
  }

  const handleArrowClick = (path) => {
    // Redirecionar para a página desejada
    window.location.href = path;
  };

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
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {loading ? (
                      <>
                        <Skeleton variant="text" width={200} height={50} />
                        <Skeleton variant="text" width={300} height={30} />
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: '700' }} gutterBottom>
                          Configurações
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {loading ? (
                      <>
                        <Skeleton variant="text" width={200} height={40} />
                        <Skeleton variant="rectangular" width="100%" height={80} sx={{ my: 0 }} />
                        <Skeleton variant="rectangular" width="100%" height={80} sx={{ my: 0 }} />
                      </>
                    ) : (
                      <>
                        <Paper variant="outlined" sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderRadius: '16px',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: theme.palette.grey[300],
                          },
                          transition: 'background-color 0.3s ease-in-out',
                        }}>
                          <Box display="flex" alignItems="center">
                            <Box sx={{
                              backgroundColor: theme.palette.grey[300],
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '40px',
                              height: '40px',
                              mr: 2,
                            }}>
                              <AppSettingsAltOutlinedIcon sx={{ color: theme.palette.primary.dark }} />
                            </Box>
                            <Box>
                              <Typography variant="h6">Geral</Typography>
                              <Typography variant="body2">Configurações gerais</Typography>
                            </Box>
                          </Box>
                          <IconButton onClick={() => handleArrowClick('/embreve')}>
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </Paper>
                        <Paper variant="outlined" sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderRadius: '16px',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: theme.palette.grey[300],
                          },
                          transition: 'background-color 0.3s ease-in-out',
                        }}>
                          <Box display="flex" alignItems="center">
                            <Box sx={{
                              backgroundColor: theme.palette.grey[300],
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '40px',
                              height: '40px',
                              mr: 2,
                            }}>
                              <EmailOutlinedIcon sx={{ color: theme.palette.primary.dark }} />
                            </Box>
                            <Box>
                              <Typography variant="h6">Notificações</Typography>
                              <Typography variant="body2">Você prefere notificação por SMS ou E-mail?</Typography>
                            </Box>
                          </Box>
                          <IconButton onClick={() => handleArrowClick('/embreve')}>
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </Paper>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Container>
              {isMobile && <MenuMobile theme={theme} />}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
