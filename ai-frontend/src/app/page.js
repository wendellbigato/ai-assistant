"use client";

import * as React from 'react';
import { Button, TextField, Link, Box, Grid, Typography, IconButton, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ContactMailIcon from '@mui/icons-material/ContactSupport';
import Image from 'next/image';

export default function SignIn() {
  const router = useRouter();
  const [formErrors, setFormErrors] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [isLoading, setIsLoading] = React.useState(false);

  // Verificar se as variáveis CSS estão definidas corretamente
  const checkCSSVariables = () => {
    console.log('CSS Variable --background-screen:', getComputedStyle(document.documentElement).getPropertyValue('--background-screen'));
    console.log('CSS Variable --primary-dark:', getComputedStyle(document.documentElement).getPropertyValue('--primary-dark'));
    console.log('CSS Variable --color-content-link:', getComputedStyle(document.documentElement).getPropertyValue('--color-content-link'));
  };

  React.useEffect(() => {
    checkCSSVariables();
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.get('email')) errors.email = 'E-mail é obrigatório';
    if (!data.get('password')) errors.password = 'Senha é obrigatória';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    const requestBody = {
      email: data.get('email'),
      senha: data.get('password'),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/auth`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
          },
        }
      );

      console.log('API Response:', response);

      if (response.data && response.data.token && response.data.user_id) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        setSnackbarMessage('Login realizado com sucesso!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        setSnackbarMessage('Erro ao realizar login, tente novamente.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarMessage('Erro ao realizar login, tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  const Header = () => (
    <Box sx={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      padding: '24px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: 'var(--background-screen)', 
      borderBottom: '1px solid #e0e0e0' 
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/assets/images/ori-icon.svg" alt="Icon" width={36} height={36} style={{ marginRight: 8 }} />
        <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' }, color: 'var(--primary-dark)', fontWeight: 'bold' }}>
          Sua IA 
        </Typography>
      </Box>
      <IconButton color="primary" href="/contact">
        <ContactMailIcon sx={{ color: 'var(--primary-dark)' }} />
      </IconButton>
    </Box>
  );

  const LoginForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Olá de novo!
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Ainda não criou sua conta? {' '}
        <Link href="cadastro" sx={{ color: 'var(--color-content-link)', fontWeight: 'bold' }}>
          Cadastre-se
        </Link>
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 360 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          error={!!formErrors.email}
          helperText={formErrors.email}
          className="text-field"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          error={!!formErrors.password}
          helperText={formErrors.password}
          className="text-field"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="button-primary"
          sx={{
            mt: 3,
            mb: 2,
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
        </Button>
        <Link href="/recuperarsenha" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'var(--color-content-link)', fontWeight: 'bold'  }}>
          Esqueci minha senha
        </Link>
      </Box>
    </Box>
  );

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: 'var(--color-background-screen)' }}>
      <Header />
      <Grid item xs={12} sm={8} md={5} sx={{ mx: 'auto', p: 4 }}>
        <LoginForm />
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
