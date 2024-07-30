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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import Header from '../../components/Header/Header';
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
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [sandboxEndpoint, setSandboxEndpoint] = useState('');
  const [sandboxBody, setSandboxBody] = useState('');
  const [sandboxResponse, setSandboxResponse] = useState(null);
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
    }, 2000);
  }, []);

  const generateApiKey = async () => {
    // Implemente a lógica para gerar uma chave da API
    const newApiKey = 'SUA_CHAVE_API_GERADA';
    setApiKey(newApiKey);
  };

  const handleSandboxRequest = async () => {
    // Implemente a lógica para fazer uma requisição para o endpoint de sandbox
    const response = await axios.post(sandboxEndpoint, JSON.parse(sandboxBody), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
    setSandboxResponse(response.data);
  };

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
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Accordion defaultExpanded sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="h6">Gerar Chave da API</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Button className="button-primary" variant="contained" onClick={generateApiKey} sx={{ mb: 2 }}>
                      Gerar Chave
                    </Button>
                    {apiKey && (
                      <Typography variant="body1">
                        Sua chave da API: <strong>{apiKey}</strong>
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography variant="h6">Endpoints</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      <strong>Upload de Arquivos</strong><br />
                      POST /upload
                    </Typography>
                    <Typography variant="body1">
                      <strong>Sincronizar Arquivos</strong><br />
                      POST /sync
                    </Typography>
                    <Typography variant="body1">
                      <strong>Mensagens</strong><br />
                      POST /messages
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography variant="h6">Exemplos de Requisições</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      <strong>Upload de Arquivos</strong>
                    </Typography>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <pre style={{ color: '#FFFFFF', backgroundColor: '#2D2D2D', padding: '16px', borderRadius: '8px' }}>{`
POST /upload
Headers:
  x-api-key: SUA_CHAVE_API
Body:
{
  "file": "data:application/pdf;base64,..."
}
                      `}</pre>
                    </Paper>
                    <Typography variant="body1">
                      <strong>Sincronizar Arquivos</strong>
                    </Typography>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <pre style={{ color: '#FFFFFF', backgroundColor: '#2D2D2D', padding: '16px', borderRadius: '8px' }}>{`
POST /sync
Headers:
  x-api-key: SUA_CHAVE_API
Body:
{
  "action": "sync"
}
                      `}</pre>
                    </Paper>
                    <Typography variant="body1">
                      <strong>Mensagens</strong>
                    </Typography>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <pre style={{ color: '#FFFFFF', backgroundColor: '#2D2D2D', padding: '16px', borderRadius: '8px' }}>{`
POST /messages
Headers:
  x-api-key: SUA_CHAVE_API
Body:
{
  "message": "Olá, como posso ajudar?"
}
                      `}</pre>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                    <Typography variant="h6">Sandbox</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Preencha os campos abaixo para testar os endpoints da API.
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Endpoint"
                      placeholder="/upload"
                      value={sandboxEndpoint}
                      onChange={(e) => setSandboxEndpoint(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Corpo da Requisição (JSON)"
                      placeholder='{ "file": "data:application/pdf;base64,..." }'
                      multiline
                      rows={4}
                      value={sandboxBody}
                      onChange={(e) => setSandboxBody(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button className="button-primary" variant="contained" onClick={handleSandboxRequest} sx={{ mb: 2 }}>
                      Testar
                    </Button>
                    {sandboxResponse && (
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="body1">
                          <strong>Resposta:</strong>
                        </Typography>
                        <pre style={{ color: '#FFFFFF', backgroundColor: '#2D2D2D', padding: '16px', borderRadius: '8px' }}>{JSON.stringify(sandboxResponse, null, 2)}</pre>
                      </Paper>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Container>
              {isMobile && <MenuMobile theme={theme} />}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
