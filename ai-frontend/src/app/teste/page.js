"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

export default function OoriAssistantPage() {
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get('https://sae6vrvgxi.execute-api.us-east-1.amazonaws.com/default/oori-assistant/chat', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'Jv9RZmV8ZwU5E4a01njX1fISUpxhkew9QP9iTMVd'
          }
        });
        setResponseMessage(response.data);
      } catch (error) {
        console.error('Erro ao enviar mensagem para o endpoint da API:', error);
        setResponseMessage('Erro ao processar a mensagem. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h6">{responseMessage}</Typography>
        )}
      </Box>
    </Container>
  );
}
