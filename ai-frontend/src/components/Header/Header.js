import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Avatar, Menu, MenuItem, Dialog, DialogContent, List, ListItem, ListItemText, Button, useMediaQuery } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const Header = ({ userName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    // Commented out fetching user profile picture
    /*
    const fetchUserProfilePicture = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users?id=${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
            },
          });
          const user = response.data;
          console.log("Dados do usuário")
          console.log(user)
          const profilePictureUrl = user.profile_picture || '';

          if (profilePictureUrl) {
            const fileName = profilePictureUrl.split('/').pop().split('?')[0];
            const renewedTokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/upload?file_name=${fileName}`, {
              headers: {
                'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
              },
            });

            const newProfilePictureUrl = renewedTokenResponse.data.file_url;
            setProfilePicture(newProfilePictureUrl);

            if (newProfilePictureUrl !== profilePictureUrl) {
              await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/users?id=${userId}`, { profile_picture: newProfilePictureUrl }, {
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
                },
              });
            }
          }
        } catch (error) {
          console.error('Erro ao carregar a foto do perfil:', error);
        }
      }
    };

    fetchUserProfilePicture();
    */
  }, []);

  const handleMenuOpen = (event) => {
    if (isMobile) {
      setMobileMenuOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.href = '/';
  };

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        padding: '8px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 1100,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="primary">
          <NotificationsIcon sx={{ color: 'var(--primary-dark)' }} />
        </IconButton>
        <Typography variant="body1" sx={{ marginRight: 0 }}>
          {userName || 'Usuário'}
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <Avatar src={profilePicture}>{!profilePicture && (userName ? userName.charAt(0) : 'U')}</Avatar>
        </IconButton>
        {!isMobile ? (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <MenuItem onClick={() => handleNavigate('/perfil')}>Perfil</MenuItem>
            <MenuItem onClick={() => handleNavigate('/configuracoes')}>Configurações</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        ) : (
          <Dialog
            open={mobileMenuOpen}
            onClose={handleMenuClose}
            fullScreen
            PaperProps={{
              sx: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Button
                onClick={handleMenuClose}
                startIcon={<ArrowBackIcon />}
                className='button-secondary'
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                Voltar
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexFlow: 'column' }}>
                <List sx={{ mt: 8, width: '100%', textAlign: 'center' }}>
                  <ListItem button onClick={() => handleNavigate('/perfil')}>
                    <ListItemText primary="Perfil" />
                  </ListItem>
                  <ListItem button onClick={() => handleNavigate('/configuracoes')}>
                    <ListItemText primary="Configurações" />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Sair" />
                  </ListItem>
                </List>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default Header;
