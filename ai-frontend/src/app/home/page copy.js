// pages/home/page.js
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import '../../styles/theme.css';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import axios from 'axios';
import Header from '../../components/Header/Header';
import OnboardingStepper from '../../components/OnboardingStepper/OnboardingStepper';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import Button from '@mui/material/Button';
import OnboardingMissoes from '../../components/OnboardingMissoes/OnboardingMissoes';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';

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
  const interactiveAccent = getCSSVariable('--interactive-accent-hover');
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
        accent: interactiveAccent,
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

function AccountSection({ onContinueClick, showContinueJourney, showPlayground, showKnowledge, showAPI, showPreOrientation }) {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isSmallMobile = useMediaQuery('(max-width: 400px)');

  return (
    <Box sx={{ mb: 4 }}>
      {showContinueJourney && (
        <Typography sx={{ mb: 2 }} variant="body2" color="textSecondary" gutterBottom>
          {showPreOrientation
            ? "Enquanto seu cadastro está em análise preparamos uma Pré-Orientação personalizada feita por nossa IA."
            : "Comece sua jornada com o pé direito e descubra como se cuidar de um jeito simples de verdade."
          }
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 1, flexDirection: isSmallMobile ? 'column' : 'row' }}>
        {showContinueJourney && (
          <Button
            className="button-primary"
            variant="contained"
            sx={{
              fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.75rem' : '0.875rem',
              padding: isSmallMobile ? '2px 4px' : isMobile ? '4px 8px' : '6px 12px',
            }}
            onClick={onContinueClick}
          >
            {showPreOrientation ? "Minha Pré-Orientação" : "Continuar jornada"}
          </Button>
        )}
        {showPlayground && (
          <Button
            className="button-primary"
            variant="contained"
            startIcon={<AutoAwesomeOutlinedIcon />}
            sx={{
              fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.75rem' : '0.875rem',
              padding: isSmallMobile ? '2px 4px' : isMobile ? '4px 8px' : '6px 12px',
            }}
          >
            Playground
          </Button>
        )}
        {showKnowledge && (
          <Button
            className="button-secondary"
            variant="contained"
            startIcon={<SchoolOutlinedIcon />}
            sx={{
              fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.75rem' : '0.875rem',
              padding: isSmallMobile ? '2px 4px' : isMobile ? '4px 8px' : '6px 12px',
            }}
          >
            Knowledge
          </Button>
        )}
        {showAPI && (
          <Button
            className="button-secondary"
            variant="contained"
            startIcon={<IntegrationInstructionsOutlinedIcon />}
            sx={{
              fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.75rem' : '0.875rem',
              padding: isSmallMobile ? '2px 4px' : isMobile ? '4px 8px' : '6px 12px',
            }}
          >
            API
          </Button>
        )}
      </Box>
    </Box>
  );
}

function HomeContent({ userName, conquistas, onContinueClick }) {
  const [loading, setLoading] = useState(true);
  const onboardingOk = conquistas?.OnboardingOk || false;
  const allOnboardingCompleted = conquistas?.Onboarding?.Cadastro && conquistas?.Onboarding?.Endereco && conquistas?.Onboarding?.InfoPessoal && conquistas?.Onboarding?.Anamnese && conquistas?.Onboarding?.Docs;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula o carregamento de dados por 2 segundos
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 1, mb: 4, backgroundColor: '#FFFFFF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AutoAwesomeOutlinedIcon />
        <Typography variant="h6" sx={{ fontWeight: '700', m: 2 }} gutterBottom>
          Oi, eu sou Sua Ai!
        </Typography>
      </Box>
      {!onboardingOk && (
        <Typography sx={{ fontWeight: '700', mb: 2 }} variant="h6" gutterBottom>
          {allOnboardingCompleted ? "Só falta mais um pouco..." : "Jornada iniciada"}
        </Typography>
      )}
      {!onboardingOk && <OnboardingStepper conquistas={conquistas} />}
      <AccountSection
        onContinueClick={onContinueClick}
        showContinueJourney={!onboardingOk}
        showPlayground={onboardingOk}
        showKnowledge={onboardingOk}
        showAPI={onboardingOk}
        showPreOrientation={allOnboardingCompleted && !onboardingOk}
      />
      <HomeSlider loading={loading} />
    </Container>
  );
}

export default function Home() {
  const [theme, setTheme] = useState(null);
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);
  const [conquistas, setConquistas] = useState(null);
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
          if (user.conquistas) {
            setConquistas(user.conquistas);
            localStorage.setItem('conquistas', JSON.stringify(user.conquistas));
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!theme) {
    return null;
  }

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
              <HomeContent userName={userName} conquistas={conquistas} onContinueClick={handleOpen} />
              {isMobile && <MenuMobile theme={theme} />}
            </Box>
          </Box>    
          <OnboardingMissoes open={open} handleClose={handleClose} conquistas={conquistas} /> 
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
