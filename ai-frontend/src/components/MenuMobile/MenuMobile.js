import * as React from 'react';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MenuMobile({ theme }) {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  if (!mounted) return null; // Garantir que o componente só seja renderizado no cliente

  return (
    <BottomNavigation showLabels sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigationAction
        label="Home"
        icon={<CottageOutlinedIcon />}
        component={Link}
        href="/home"
        sx={{ color: currentPath === '/home' ? theme.palette.primary.dark : theme.palette.grey[700] }}
      />
      <BottomNavigationAction
        label="Knowledge"
        icon={<SchoolOutlinedIcon />}
        component={Link}
        href="/knowledge"
        sx={{ color: currentPath === '/knowledge' ? theme.palette.primary.dark : theme.palette.grey[700] }}
      />
      <BottomNavigationAction
        label="Playground"
        icon={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '24px' }}>
            <AutoAwesomeOutlinedIcon sx={{ fontSize: 36, width:'50px' }} />
          </Box>
        }
        component={Link}
        href="/playground"
        sx={{ color: currentPath === '/playground' ? theme.palette.primary.dark : theme.palette.grey[700] }}
      />
      <BottomNavigationAction
        label="API"
        icon={<IntegrationInstructionsOutlinedIcon />}
        component={Link}
        href="/apipage"
        sx={{ color: currentPath === '/apipage' ? theme.palette.primary.dark : theme.palette.grey[700] }}
      />
      <BottomNavigationAction
        label="Plano"
        icon={<WorkspacePremiumOutlinedIcon />}
        component={Link}
        href="/meuplano"
        sx={{ color: currentPath === '/meuplano' ? theme.palette.primary.dark : theme.palette.grey[700] }}
      />
    </BottomNavigation>
  );
}
