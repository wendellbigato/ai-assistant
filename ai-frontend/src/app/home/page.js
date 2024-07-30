"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import '../../styles/theme.css';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import axios from 'axios';
import Header from '../../components/Header/Header';
import OnboardingMissoes from '../../components/OnboardingMissoes/OnboardingMissoes';

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

const getCardStyles = () => ({
  paperPadding: 3,
  paperBgColor: '#FFFFFF',
  paperBorder: '1px solid #CCCCCC',
  paperBorderRadius: '16px',
  paperHeight: '112px',
  paperBoxShadow: 'none',
  typographyColor: 'var(--text-primary)',
  typographyFontWeight: 'bold',
  iconColor: 'var(--secondary-light)',
  titleColor: 'var(--primary-light)',
  iconFontSize: '32px',
  margin: '10px',
});

function HomeContent({ loading }) {
  const cardStyles = getCardStyles();

  const cards = [
    {
      href: "/playground",
      title: "Playground",
      description: "Explore e experimente as capacidades da sua IA.",
      icon: <AutoAwesomeOutlinedIcon sx={{ mr: 4, fontSize: cardStyles.iconFontSize, color: cardStyles.iconColor }} />
    },
    {
      href: "/knowledge",
      title: "Knowledge",
      description: "Gerencie a sua base de conhecimento.",
      icon: <SchoolOutlinedIcon sx={{ mr: 4, fontSize: cardStyles.iconFontSize, color: cardStyles.iconColor }} />
    },
    {
      href: "/apipage",
      title: "API",
      description: "Integre a sua AI via API bem fácil. Em breve!",
      icon: <IntegrationInstructionsOutlinedIcon sx={{ mr: 4, fontSize: cardStyles.iconFontSize, color: cardStyles.iconColor }} />
    },
    {
      href: "/meuplano",
      title: "Meu Plano",
      description: "Gerencie seu plano e acompanhe seu progresso.",
      icon: <WorkspacePremiumOutlinedIcon sx={{ mr: 4, fontSize: cardStyles.iconFontSize, color: cardStyles.iconColor }} />
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 1, mb: 4, backgroundColor: '#FFFFFF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: '700', m: 2 }} gutterBottom>
          Oi, eu sou Sua IA!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Link href={card.href} sx={{ textDecoration: 'none' }}>
              <Paper sx={{ p: cardStyles.paperPadding, backgroundColor: cardStyles.paperBgColor, border: cardStyles.paperBorder, borderRadius: cardStyles.paperBorderRadius, height: cardStyles.paperHeight, boxShadow: cardStyles.paperBoxShadow, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: cardStyles.margin }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  {card.icon}
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Typography variant="body2" sx={{ color: cardStyles.titleColor, fontWeight: 'bold' }}>{card.title}</Typography>
                    <Typography variant="body2" sx={{ color: cardStyles.typographyColor, fontWeight: cardStyles.typographyFontWeight }}>{card.description}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
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
              <HomeContent />
              {isMobile && <MenuMobile theme={theme} />}
            </Box>
          </Box>
          <OnboardingMissoes open={open} handleClose={handleClose} conquistas={conquistas} />
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
