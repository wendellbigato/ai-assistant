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
import Skeleton from '@mui/material/Skeleton';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../../styles/theme.css';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import Header from '../../components/Header/Header';
import axios from 'axios';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import UploadImagem from '../../components/UploadImagem/UploadImagem';

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

function Perfil() {
  const [theme, setTheme] = useState(createCustomTheme());
  const [userData, setUserData] = useState({
    nomeCompleto: '',
    email: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    countryCode: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    profile_picture: '' // Adiciona o campo profile_picture
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const fetchData = async () => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users?userId=${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });
        console.log('Resposta do GET:', response);
        const user = response.data;
        const countryCode = user.telefone.slice(0, 3);
        const telefone = user.telefone.slice(3);
        setUserData({
          nomeCompleto: user.nome,
          email: user.email,
          cpf: user.cpf,
          dataNascimento: user.dataNascimento,
          telefone,
          countryCode,
          cep: user.cep,
          logradouro: user.logradouro,
          numero: user.numero,
          complemento: user.complemento,
          bairro: user.bairro,
          cidade: user.cidade,
          uf: user.uf,
          profile_picture: user.profile_picture
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event, section) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let updatedData = {};

    switch (section) {
      case 'Informações Pessoais':
        updatedData = {
          nome: data.get('nomeCompleto'),
          dataNascimento: data.get('dataNascimento')
        };
        break;
      case 'Informações de Contato':
        const telefone = data.get('telefone').replace(/\D/g, '');
        updatedData = {
          telefone: `${data.get('countryCode')}${telefone}`,
          email: data.get('email')
        };
        break;
      case 'Senha de Login':
        updatedData = {
          novaSenha: data.get('novaSenha')
        };
        break;
      case 'Endereço':
        updatedData = {
          cep: data.get('cep'),
          logradouro: data.get('logradouro'),
          numero: data.get('numero'),
          complemento: data.get('complemento'),
          bairro: data.get('bairro'),
          cidade: data.get('cidade'),
          uf: data.get('uf')
        };
        break;
      default:
        break;
    }

    const userId = localStorage.getItem('user_id');

    if (userId) {
      try {
        console.log('Dados antes do PATCH:', updatedData);
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/users?userId=${userId}`, updatedData, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });
        console.log('Resposta do PATCH:', response);
        if (response.status === 200) {
          alert('Dados atualizados com sucesso!');
          setUserData((prevData) => ({
            ...prevData,
            ...updatedData
          }));
        }
      } catch (error) {
        console.error('Erro ao atualizar dados:', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleModalOpen = (section) => {
    setOpenModal(section);
  };

  const handleModalClose = () => {
    setOpenModal(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const updateProfilePicture = (newUrl) => {
    setUserData((prevData) => ({
      ...prevData,
      profile_picture: newUrl
    }));
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
    setLoading(true);
    fetchData();
  };

  const sections = [
    {
      name: 'Informações Pessoais',
      description: 'Atualize suas informações pessoais',
      icon: <AppSettingsAltOutlinedIcon />
    },
    {
      name: 'Informações de Contato',
      description: 'Atualize suas informações de contato',
      icon: <EmailOutlinedIcon />
    },
    {
      name: 'Senha de Login',
      description: 'Atualize sua senha de login',
      icon: <LockOutlinedIcon />
    },
    {
      name: 'Endereço',
      description: 'Atualize seu endereço',
      icon: <HomeOutlinedIcon />
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        {!isMobile && <Navbar />}
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Header userName={userData.nomeCompleto} />
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box sx={{ marginTop: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                {loading ? (
                  <Skeleton variant="circular" width={100} height={100} />
                ) : (
                  <Avatar
                    alt={userData.nomeCompleto}
                    src={userData.profile_picture || "/static/images/avatar/1.jpg"}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                )}
                <IconButton
                  sx={{ position: 'absolute', bottom: 0, right: 0 }}
                  onClick={toggleDrawer(true)}
                >
                  <CameraAltIcon />
                </IconButton>
              </Box>
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                {loading ? <Skeleton width={200} /> : 'Perfil'}
              </Typography>
              {loading
                ? sections.map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width="100%"
                      height={60}
                      sx={{ mb: 2, borderRadius: '16px' }}
                    />
                  ))
                : sections.map((section) => (
                    <Paper
                      key={section.name}
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        border: 'none',
                        width: '100%',
                        mb: 2,
                        '&:hover': {
                          backgroundColor: theme.palette.grey[300]
                        },
                        transition: 'background-color 0.3s ease-in-out'
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            backgroundColor: theme.palette.grey[300],
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            mr: 2
                          }}
                        >
                          {section.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6">{section.name}</Typography>
                          <Typography variant="body2">{section.description}</Typography>
                        </Box>
                      </Box>
                      <IconButton onClick={() => handleModalOpen(section.name)}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </Paper>
                  ))}
            </Box>
          </Container>
          {isMobile && <MenuMobile theme={theme} />}
        </Box>
        {sections.map((section) => (
          <Modal
            key={section.name}
            open={openModal === section.name}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                p: 4,
                overflow: 'auto'
              }}
            >
              <IconButton onClick={handleModalClose} sx={{ mb: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography sx={{ mb: 4 }} id="modal-modal-title" variant="h6" component="h2">
                {section.name}
              </Typography>
              <ProfileForm
                section={section}
                userData={userData}
                handleSubmit={(event) => handleSubmit(event, section.name)}
                handleChange={handleChange}
              />
            </Box>
          </Modal>
        ))}
        {openDrawer && (
          <UploadImagem open={openDrawer} toggleDrawer={toggleDrawer} updateProfilePicture={updateProfilePicture} />
        )}
      </Box>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Foto de perfil atualizada com sucesso!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default function WrappedPerfil() {
  return (
    <TokenVerification>
      <Perfil />
    </TokenVerification>
  );
}
