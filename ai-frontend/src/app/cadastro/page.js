"use client";

import * as React from 'react';
import { Button, TextField, Link, Box, Grid, Typography, IconButton, Snackbar, Alert, CircularProgress, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ContactMailIcon from '@mui/icons-material/ContactSupport';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const countryCodes = ['+55', '+1', '+91']; // Adicione outros códigos de país conforme necessário

const EmailStep = ({ handleNext, formErrors, handleInputChange, formData }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
    <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      Crie sua conta
    </Typography>
    <Typography variant="body2" sx={{ mb: 3 }}>
      Já possui uma conta? {' '}
      <Link href="/" sx={{ color: 'var(--color-content-link)', fontWeight: 'bold' }}>
        Faça o Login aqui
      </Link>
    </Typography>
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="E-mail"
      name="email"
      autoComplete="email"
      error={!!formErrors.email}
      helperText={formErrors.email}
      value={formData.email}
      onChange={handleInputChange}
      className="text-field"
    />
    <Button
      onClick={handleNext}
      fullWidth
      variant="contained"
      className="button-primary"
      sx={{ mt: 3, mb: 2 }}
    >
      Próximo
    </Button>
  </Box>
);

const NameCpfBirthStep = ({ handlePrev, handleNext, formErrors, handleInputChange, formData }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
    <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      Crie sua conta
    </Typography>
    <TextField
      margin="normal"
      required
      fullWidth
      id="nome"
      label="Nome Completo"
      name="nome"
      autoComplete="nome"
      autoFocus
      error={!!formErrors.nome}
      helperText={formErrors.nome}
      value={formData.nome}
      onChange={handleInputChange}
      className="text-field"
    />
    <InputMask mask="999.999.999-99" maskChar="" value={formData.cpf} onChange={handleInputChange}>
      {() => (
        <TextField
          margin="normal"
          required
          fullWidth
          id="cpf"
          label="CPF"
          name="cpf"
          autoComplete="cpf"
          error={!!formErrors.cpf}
          helperText={formErrors.cpf}
          className="text-field"
        />
      )}
    </InputMask>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <InputMask mask="99" maskChar="" value={formData.day} onChange={handleInputChange}>
          {() => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="day"
              label="Dia"
              name="day"
              autoComplete="bday-day"
              error={!!formErrors.dataNascimento}
              className="text-field"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item xs={4}>
        <InputMask mask="99" maskChar="" value={formData.month} onChange={handleInputChange}>
          {() => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="month"
              label="Mês"
              name="month"
              autoComplete="bday-month"
              error={!!formErrors.dataNascimento}
              className="text-field"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item xs={4}>
        <InputMask mask="9999" maskChar="" value={formData.year} onChange={handleInputChange}>
          {() => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="year"
              label="Ano"
              name="year"
              autoComplete="bday-year"
              error={!!formErrors.dataNascimento}
              helperText={formErrors.dataNascimento}
              className="text-field"
            />
          )}
        </InputMask>
      </Grid>
    </Grid>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
      <Button
        onClick={handlePrev}
        fullWidth
        variant="contained"
        className="button-secondary"
        sx={{ mb: 2, mr: 1 }}
      >
        Anterior
      </Button>
      <Button
        onClick={handleNext}
        fullWidth
        variant="contained"
        className="button-primary"
        sx={{ mb: 2, ml: 1 }}
      >
        Próximo
      </Button>
    </Box>
  </Box>
);

const PhoneStep = ({ handlePrev, handleNext, formErrors, handleInputChange, formData }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
    <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      Crie sua conta
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          select
          fullWidth
          id="countryCode"
          label="Código do País"
          name="countryCode"
          value={formData.countryCode}
          onChange={handleInputChange}
          className="text-field"
        >
          {countryCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={8}>
        <InputMask mask="(99) 99999-9999" maskChar="" value={formData.telefone} onChange={handleInputChange}>
          {() => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="telefone"
              label="Telefone"
              name="telefone"
              autoComplete="telefone"
              error={!!formErrors.telefone}
              helperText={formErrors.telefone}
              className="text-field"
            />
          )}
        </InputMask>
      </Grid>
    </Grid>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
      <Button
        onClick={handlePrev}
        fullWidth
        variant="contained"
        className="button-secondary"
        sx={{ mb: 2, mr: 1 }}
      >
        Anterior
      </Button>
      <Button
        onClick={handleNext}
        fullWidth
        variant="contained"
        className="button-primary"
        sx={{ mb: 2, ml: 1 }}
      >
        Próximo
      </Button>
    </Box>
  </Box>
);

const PasswordStep = ({ handlePrev, handleNext, formErrors, handleInputChange, formData }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
    <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      Crie sua conta
    </Typography>
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
      value={formData.password}
      onChange={handleInputChange}
      className="text-field"
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="confirmPassword"
      label="Confirme sua Senha"
      type="password"
      id="confirmPassword"
      autoComplete="current-password"
      error={!!formErrors.confirmPassword}
      helperText={formErrors.confirmPassword}
      value={formData.confirmPassword}
      onChange={handleInputChange}
      className="text-field"
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
      <Button
        onClick={handlePrev}
        fullWidth
        variant="contained"
        className="button-secondary"
        sx={{ mb: 2, mr: 1 }}
      >
        Anterior
      </Button>
      <Button
        onClick={handleNext}
        fullWidth
        variant="contained"
        className="button-primary"
        sx={{ mb: 2, ml: 1 }}
      >
        Próximo
      </Button>
    </Box>
  </Box>
);

const TermsStep = ({ handlePrev, handleSubmit, formErrors, handleInputChange, formData, isLoading }) => (
  <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
    <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      Termos e Condições
    </Typography>
    <Box sx={{ maxHeight: '200px', overflowY: 'auto', mb: 2, padding: '0 16px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {/* Include the full text of the terms and conditions here */}
         <strong>1. Introdução</strong>
          Bem-vindo ao aplicativo Sua IA, uma plataforma de Retrieval Augmented Generation (RAG) em fase beta. Ao utilizar este aplicativo, você concorda com os seguintes termos e condições. Leia atentamente antes de prosseguir.

          <strong>2. Natureza Beta do Serviço</strong>
          O aplicativo Sua IA está atualmente em fase beta, o que significa que ainda está em desenvolvimento e pode conter erros ou funcionalidades incompletas. O uso do aplicativo é de sua inteira responsabilidade, e não garantimos a continuidade ou a perfeição dos serviços oferecidos.

          <strong>3. Responsabilidade pelo Conteúdo</strong>
          A Sua IA não se responsabiliza pelo conteúdo dos textos e arquivos enviados pelos usuários. Isso inclui, mas não se limita a, informações incorretas, imprecisas ou incompletas. As respostas geradas pelo aplicativo são baseadas exclusivamente no conteúdo fornecido pelos usuários e podem não refletir informações precisas ou completas.

          <strong>4. Política de Conteúdo Inapropriado</strong>
          A Sua IA não compactua com conteúdo que seja racista, preconceituoso, homofóbico, machista ou de qualquer natureza discriminatória ou ofensiva. Os usuários são estritamente proibidos de usar o aplicativo para gerar, compartilhar ou promover tal conteúdo. Nos reservamos o direito de tomar medidas adequadas, incluindo a suspensão ou a exclusão de contas, contra usuários que violarem esta política.

          <strong>5. Cooperação para Transparência e Verdade</strong>
          Comprometemo-nos a cooperar com as autoridades competentes e a comunidade em geral em busca da verdade e da transparência. Estamos dispostos a colaborar em investigações ou denúncias relacionadas ao uso indevido do aplicativo ou ao conteúdo gerado.

          <strong>6. Limitação de Responsabilidade</strong>
          Na máxima extensão permitida por lei, a Sua IA e seus desenvolvedores não serão responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais ou especiais decorrentes do uso ou da incapacidade de usar o aplicativo, mesmo que tenhamos sido informados da possibilidade de tais danos.

          <strong>7. Alterações nos Termos e Condições</strong>
          Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento. Quaisquer alterações serão notificadas aos usuários e entrarão em vigor imediatamente após a publicação.

          <strong>8. Aceitação dos Termos</strong>
          Ao usar o aplicativo Sua IA, você concorda com estes Termos e Condições. Se não concordar com qualquer parte destes termos, por favor, não utilize o aplicativo.

          <strong>9. Contato</strong>
          Se você tiver dúvidas ou preocupações sobre estes Termos e Condições, entre em contato conosco por meio dos canais oficiais de suporte ao usuário.

          <strong>Whatsapp Suporte:</strong> (79) 98112-4989

          Ao continuar a usar o aplicativo, você reconhece que leu, compreendeu e concorda em estar vinculado a estes Termos e Condições.

      </Typography>
    </Box>
    <FormControlLabel
      control={
        <Checkbox
          checked={formData.termsAccepted}
          onChange={handleInputChange}
          name="termsAccepted"
          color="primary"
        />
      }
      label="Eu li e concordo com os Termos e Condições"
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
      <Button
        onClick={handlePrev}
        fullWidth
        variant="contained"
        className="button-secondary"
        sx={{ mb: 2, mr: 1 }}
      >
        Anterior
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="button-primary"
        sx={{ mb: 2, ml: 1 }}
        disabled={!formData.termsAccepted || isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Concordar e Cadastrar'}
      </Button>
    </Box>
  </Box>
);

export default function SignUp() {
  const router = useRouter();
  const [formErrors, setFormErrors] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    nome: '',
    email: '',
    cpf: '',
    day: '',
    month: '',
    year: '',
    countryCode: '+55',
    telefone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false, // New field for terms acceptance
  });

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) errors.email = 'E-mail é obrigatório';
    if (!data.cpf) errors.cpf = 'CPF é obrigatório';
    if (!data.nome) errors.nome = 'Nome é obrigatório';
    if (!data.day || !data.month || !data.year) errors.dataNascimento = 'Data de Nascimento é obrigatória';
    if (!data.telefone) errors.telefone = 'Telefone é obrigatório';
    if (!data.password) errors.password = 'Senha é obrigatória';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'As senhas não conferem';
    if (step === 4 && !data.termsAccepted) errors.termsAccepted = 'Você deve aceitar os termos e condições';
    return errors;
  };

  const handleNextStep = async () => {
    if (step === 0) {
      const errors = validateForm(formData);
      if (errors.email) {
        setFormErrors(errors);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users`, {
          params: { email: formData.email },
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
          },
        });

        if (response.data.emailJaCadastrado) {
          setSnackbarMessage('E-mail já cadastrado.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        } else {
          setStep((prevStep) => prevStep + 1);
        }
      } catch (error) {
        setSnackbarMessage('Erro ao verificar e-mail.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    const telefone = `${formData.countryCode}${formData.telefone.replace(/\D/g, '')}`;
    const dataNascimento = `${formData.year}-${formData.month}-${formData.day}`;
    const requestBody = {
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf.replace(/\D/g, ''),
      dataNascimento: dataNascimento,
      senha: formData.password,
      telefone: telefone,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/users`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
          },
        }
      );

      if (response.status === 201) {
        setSnackbarMessage('Cadastro realizado com sucesso!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setSnackbarMessage('Erro ao realizar cadastro, tente novamente.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setIsLoading(false);
      }
    } catch (error) {
      setSnackbarMessage('Erro ao realizar cadastro, tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      <IconButton color="primary" href="/">
        <ArrowBackIcon sx={{ color: 'var(--primary-dark)' }} />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/assets/images/ori-icon.svg" alt="Icon" width={36} height={36} style={{ marginRight: 8 }} />
        <Typography variant="h4" sx={{ display: { xs: 'none', sm: 'block' }, color: 'var(--primary-dark)', fontWeight: 'bold' }}>
          Sua AI
        </Typography>
      </Box>
      <IconButton color="primary" href="/contact">
        <ContactMailIcon sx={{ color: 'var(--primary-dark)' }} />
      </IconButton>
    </Box>
  );

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: 'var(--color-background-screen)' }}>
      <Header />
      <Grid item xs={12} sm={8} md={5} sx={{ mx: 'auto', p: 4 }}>
        {step === 0 && <EmailStep handleNext={handleNextStep} formErrors={formErrors} handleInputChange={handleInputChange} formData={formData} />}
        {step === 1 && <NameCpfBirthStep handlePrev={handlePrevStep} handleNext={handleNextStep} formErrors={formErrors} handleInputChange={handleInputChange} formData={formData} />}
        {step === 2 && <PhoneStep handlePrev={handlePrevStep} handleNext={handleNextStep} formErrors={formErrors} handleInputChange={handleInputChange} formData={formData} />}
        {step === 3 && <PasswordStep handlePrev={handlePrevStep} handleNext={handleNextStep} formErrors={formErrors} handleInputChange={handleInputChange} formData={formData} />}
        {step === 4 && <TermsStep handlePrev={handlePrevStep} handleSubmit={handleSubmit} formErrors={formErrors} handleInputChange={handleInputChange} formData={formData} isLoading={isLoading} />}
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
