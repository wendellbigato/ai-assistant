import * as React from 'react';
import dynamic from 'next/dynamic';
import { Box, Grid, Typography } from '@mui/material';
import animationData from '../../../public/assets/images/animation-cbd.json';

// Importa Lottie dinamicamente
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Manutencao() {
  return (
    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center'}}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />
      </Box>
    </Grid>
  );
}