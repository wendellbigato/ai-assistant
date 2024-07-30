import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import InputMask from 'react-input-mask';

const countryCodes = ['+1', '+55', '+91']; // Adicione os códigos de país necessários
const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function ProfileForm({ section, userData, handleChange, handleSubmit }) {
  const [localData, setLocalData] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLocalData(userData);
  }, [userData]);

  const handleLocalChange = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleChange(event);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      {section.name === 'Informações Pessoais' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="nomeCompleto"
              label="Nome Completo"
              name="nomeCompleto"
              value={localData?.nomeCompleto || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="dataNascimento"
              label="Data de Nascimento"
              name="dataNascimento"
              value={localData?.dataNascimento || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              value={localData?.cpf || ''}
              onChange={handleLocalChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      )}
      {section.name === 'Informações de Contato' && (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              id="countryCode"
              label="Código do País"
              name="countryCode"
              value={localData?.countryCode || ''}
              onChange={handleLocalChange}
            >
              {countryCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <InputMask
              mask="(99) 99999-9999"
              value={localData?.telefone || ''}
              onChange={handleLocalChange}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  fullWidth
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              value={localData?.email || ''}
              onChange={handleLocalChange}
            />
          </Grid>
        </Grid>
      )}
      {section.name === 'Senha de Login' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="novaSenha"
              label="Nova Senha"
              name="novaSenha"
              type={showPassword ? 'text' : 'password'}
              value={localData?.novaSenha || ''}
              onChange={handleLocalChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
      {section.name === 'Endereço' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="cep"
              label="CEP"
              name="cep"
              value={localData?.cep || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="logradouro"
              label="Logradouro"
              name="logradouro"
              value={localData?.logradouro || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="numero"
              label="Número"
              name="numero"
              value={localData?.numero || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="complemento"
              label="Complemento"
              name="complemento"
              value={localData?.complemento || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bairro"
              label="Bairro"
              name="bairro"
              value={localData?.bairro || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="cidade"
              label="Cidade"
              name="cidade"
              value={localData?.cidade || ''}
              onChange={handleLocalChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              id="uf"
              label="UF"
              name="uf"
              value={localData?.uf || ''}
              onChange={handleLocalChange}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disableElevation
        size="large"
        className="button-primary"
      >
        Salvar Alterações
      </Button>
    </Box>
  );
}

export default ProfileForm;
