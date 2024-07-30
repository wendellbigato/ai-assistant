import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

function ListItemLink({ href, icon, primary, currentPath }) {
  const theme = useTheme();
  const selected = currentPath === href;
  const color = selected ? theme.palette.primary.dark : theme.palette.grey[700]; // Mudança para primary-dark

  return (
    <StyledLink href={href} passHref>
      <ListItemButton component="a" sx={{ color }}>
        <ListItemIcon sx={{ color }}>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </StyledLink>
  );
}

export function MainListItems({ currentPath }) {
  return (
    <React.Fragment>
      <ListItemLink href="/home" icon={<CottageOutlinedIcon />} primary="Home" currentPath={currentPath} />
      <ListItemLink href="/playground" icon={<AutoAwesomeOutlinedIcon />} primary="Playground" currentPath={currentPath} />
      <ListItemLink href="/knowledge" icon={<SchoolOutlinedIcon />} primary="Knowledge" currentPath={currentPath} />
      <ListItemLink href="/apipage" icon={<IntegrationInstructionsOutlinedIcon />} primary="API" currentPath={currentPath} />
    </React.Fragment>
  );
}

export function SecondaryListItems({ currentPath }) {
  return (
    <React.Fragment>
      <ListItemLink href="/meuplano" icon={<WorkspacePremiumOutlinedIcon />} primary="Meu Plano" currentPath={currentPath} />
    </React.Fragment>
  );
}
