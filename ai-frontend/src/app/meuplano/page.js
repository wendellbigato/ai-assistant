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
import Skeleton from '@mui/material/Skeleton';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import axios from 'axios';
import '../../styles/theme.css';
import Image from 'next/image';

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

export default function MeuPlano() {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [credit, setCredit] = useState(0);
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
          setCredit(user.credit);
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

  const handleAumentarLimiteClick = () => {
    window.open('https://pag.ae/7-LxGrC9u', '_blank');
  };

  if (!theme) {
    return null;
  }

  return (
    <TokenVerification>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
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
                        <Skeleton variant="rectangular" width="100%" height={200} />
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: '700' }} gutterBottom>
                          Meu Plano
                        </Typography>
                        <UsagePanel credit={credit} onAumentarLimiteClick={handleAumentarLimiteClick} />
                        <PaymentInstructions />
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

function UsagePanel({ credit, onAumentarLimiteClick }) {
  const taxaMensagem = parseFloat(process.env.NEXT_PUBLIC_TAXA_REAIS_POR_MENSAGEM || '0.20');
  const total = (credit * taxaMensagem).toFixed(2);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Créditos</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4">
                R$ {total}
              </Typography>
              <Typography variant="body1">
                 R$ {taxaMensagem.toFixed(2)}/mensagem
              </Typography>
            </Box>
            <Button className='button-primary' variant="contained" sx={{ mt: 2 }} onClick={onAumentarLimiteClick}>
              Aumentar limite
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function PaymentInstructions() {
  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="body1" sx={{ display: 'block', alignItems: 'center' }}>
        <strong>Instruções de Pagamento:</strong> na hora do pagamento preencha o formulário com seu nome e e-mail da sua conta aqui na Sua IA. 
      </Typography>
      <Box sx={{ my: 2 }}>
        <Image
          src="/assets/images/form_tutorial.png"
          alt="Exemplo de Preenchimento"
          width={600}
          height={400}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>
      <Typography variant="body1" sx={{ display: 'block', alignItems: 'center' }}>
        Em caso de dúvidas, envie um e-mail com o comprovante para 
        <MailOutlineIcon sx={{ mx: 0.5 }} /> 
        <a href="mailto:wendell@oori.me">wendell@oori.me</a> 
      </Typography>
      <Typography variant="body1" sx={{ display: 'block', alignItems: 'center' }}>
        Ou entre em contato pelo WhatsApp 
        <WhatsAppIcon sx={{ mx: 0.5 }} /> 
        <a href="https://wa.me/5579981124989" target="_blank" rel="noopener noreferrer">79 98112-4989</a>.
      </Typography>
    </Paper>
  );
}