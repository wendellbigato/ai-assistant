"use client";

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Typography, TextField, Button, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import InputMask from 'react-input-mask';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PasswordRecovery() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cpf, setCpf] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

  const handleCpfSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
        const cleanedCpf = cpf.replace(/\D/g, '');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/codigo`, { cpf: cleanedCpf },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
          },
        }
      );
      const { email, userId } = response.data;
      setEmail(email);
      setUserId(userId);
      setSnackbarMessage('Código enviado para o seu e-mail!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setStep(2);
    } catch (error) {
      setSnackbarMessage('Erro ao enviar código, tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    setStep(3);
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setFormErrors({ confirmPassword: 'Senhas não coincidem' });
      return;
    }

    setIsLoading(true);

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/users?id=${userId}`, {
        senha: newPassword,
      },
        {   
        headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
      }});
      setSnackbarMessage('Senha alterada com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      setSnackbarMessage('Erro ao alterar senha, tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: 'var(--color-background-screen)' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, padding: '24px' }}>
        <IconButton color="primary" onClick={() => router.push('/')}>
          <ArrowBackIcon sx={{ color: 'var(--primary-dark)' }} />
        </IconButton>
      </Box>
      <Grid item xs={12} sm={8} md={5} sx={{ mx: 'auto', p: 4 }}>
        {step === 1 && (
          <Box component="form" noValidate onSubmit={handleCpfSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Recuperar Senha
            </Typography>
            <InputMask mask="999.999.999-99" maskChar="" value={cpf} onChange={(e) => setCpf(e.target.value)}>
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                  autoFocus
                  error={!!formErrors.cpf}
                  helperText={formErrors.cpf}
                  className="text-field"
                />
              )}
            </InputMask>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button-primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Código'}
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box component="form" noValidate onSubmit={handleCodeSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Verificar Código
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Enviamos um código de verificação para o e-mail {email ? email.replace(/(.{2})(.*)(?=@)/, "$1***") : ''}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Código de Verificação"
              name="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={!!formErrors.code}
              helperText={formErrors.code}
              className="text-field"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button-primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verificar Código'}
            </Button>
          </Box>
        )}

        {step === 3 && (
          <Box component="form" noValidate onSubmit={handlePasswordSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Nova Senha
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Nova Senha"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!formErrors.newPassword}
              helperText={formErrors.newPassword}
              className="text-field"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Nova Senha"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              className="text-field"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button-primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Alterar Senha'}
            </Button>
          </Box>
        )}
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
