import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function TokenVerification({ children }) {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    let didCancel = false;

    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APIURL}/token`,
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
            },
          }
        );
        if (!didCancel) {
          if (response.status === 200) {
            setIsTokenValid(true);
          } else {
            router.push('/');
          }
        }
      } catch (error) {
        if (!didCancel) {
          console.error('Erro ao verificar token:', error);
          router.push('/');
        }
      } finally {
        if (!didCancel) {
          setLoading(false);
        }
      }
    };

    verifyToken();

    return () => {
      didCancel = true;
    };
  }, [router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isTokenValid) {
    return null; // ou redirecionar para a página de login
  }

  return children;
}
