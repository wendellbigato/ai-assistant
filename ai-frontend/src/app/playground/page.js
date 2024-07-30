"use client";

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Header from '../../components/Header/Header';
import axios from 'axios';
import Image from 'next/image';
import '../../styles/theme.css';
import TokenVerification from '../../components/TokenVerification/TokenVerification';

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

export default function ChatPage() {
  const [theme, setTheme] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(''); // Estado para armazenar o userId
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const customTheme = createCustomTheme();
    setTheme(customTheme);

    const fetchUserData = async () => {
      const userIdFromLocalStorage = localStorage.getItem('user_id');
      if (userIdFromLocalStorage) {
        setUserId(userIdFromLocalStorage); // Definindo o userId
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users?userId=${userIdFromLocalStorage}`, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
            }
          });
          const user = response.data;
          setUserName(user.nome);
          setEmail(user.email);
          setMessages([
            { text: `Olá ${user.nome}, como posso te ajudar?`, sender: 'bot', icon: '/assets/images/ori-icon.svg' },
          ]);
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = input;
      setMessages([...messages, { text: userMessage, sender: 'user' }]);
      setInput('');

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'assimilando...', sender: 'bot', icon: '/assets/images/ori-icon.svg' }
      ]);

      try {
        const response = await axios.post('https://sae6vrvgxi.execute-api.us-east-1.amazonaws.com/default/oori-assistant/chat', {
          query: userMessage,
          k: 3,
          session_id: '',
          namespace: email,
          userId: userId // Incluindo o userId na requisição
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });

        const botResponse = response.data.answer;

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { text: botResponse, sender: 'bot', icon: '/assets/images/ori-icon.svg' }
        ]);
      } catch (error) {
        console.error('Erro ao enviar mensagem para o endpoint da API:', error);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { text: 'Erro ao processar a mensagem. Por favor, tente novamente.', sender: 'bot', icon: '/assets/images/oori-icon.svg' }
        ]);
      }
    }
  };

  if (!theme) {
    return null;
  }

  return (
    <TokenVerification>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#FFFFFF' }}>
          <CssBaseline />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, pl: 2 }}>
              <IconButton color="primary" onClick={() => window.history.back()}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 1 }}>Voltar</Typography>
            </Box>
            <Header userName={userName} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              mt: isMobile ? '64px' : '80px',
              overflow: 'hidden',
            }}
          >
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                pt: 2,
              }}
            >
              <Container
                maxWidth="md"
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  mb: 2,
                  mt: 4,
                }}
              >
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                  {messages.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        mb: 1
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: '#F5F5F5',
                          color: '#000000',
                          display: 'flex',
                          alignItems: 'flex-start',
                          maxWidth: '95%',
                        }}
                      >
                        {message.icon && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mr: 2 }}>
                            <Image src={message.icon} alt="Icon" width={24} height={24} />
                          </Box>
                        )}
                        <Typography variant="body1">{message.text}</Typography>
                      </Paper>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>
              </Container>
            </Box>
            <Box
              sx={{
                display: 'flex',
                p: 2,
                borderTop: '1px solid #e0e0e0',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: '#FFFFFF',
                zIndex: 1000,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Digite uma mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
