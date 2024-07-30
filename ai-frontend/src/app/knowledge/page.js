/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CssBaseline, Container, Snackbar, Alert, List, ListItem, ListItemText, IconButton, Avatar, ListItemAvatar, MenuItem, Tabs, Tab, Fab, CircularProgress, LinearProgress, Chip } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/CloudUpload';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';  // Import the icon for synchronization
import axios from 'axios';
import '../../styles/theme.css';
import TokenVerification from '../../components/TokenVerification/TokenVerification';
import Navbar from '../../components/Navbar/Navbar';
import MenuMobile from '../../components/MenuMobile/MenuMobile';
import Header from '../../components/Header/Header';
import Skeleton from '@mui/material/Skeleton';
import DropzoneDocs from '../../components/DropzoneDocs/DropzoneDocs';

const drawerBleeding = 0;

const getCSSVariable = (variable) => {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    return value || '#000000';
  }
  return '#000000';
};

const createCustomTheme = () => {
  const primaryMain = getCSSVariable('--primary-main');
  const primaryDark = getCSSVariable('--primary-dark');
  const primaryLight = getCSSVariable('--primary-light');
  const secondaryMain = getCSSVariable('--secondary-main');
  const secondaryDark = getCSSVariable('--secondary-dark');
  const secondaryLight = getCSSVariable('--secondary-light');
  const textPrimary = getCSSVariable('--text-primary');
  const textSecondary = getCSSVariable('--text-secondary');
  const fontFamilyPrimary = getCSSVariable('--font-family-primary');
  const fontFamilySecondary = getCSSVariable('--font-family-secondary');

  return createTheme({
    palette: {
      primary: {
        main: primaryMain,
        dark: primaryDark,
        light: primaryLight,
        contrastText: textPrimary,
      },
      secondary: {
        main: secondaryMain,
        dark: secondaryDark,
        light: secondaryLight,
        contrastText: textSecondary,
      },
    },
    typography: {
      fontFamily: fontFamilySecondary,
      h1: {
        fontFamily: fontFamilyPrimary,
      },
      h2: {
        fontFamily: fontFamilyPrimary,
      },
      h3: {
        fontFamilyPrimary,
      },
      h4: {
        fontFamilyPrimary,
      },
      h5: {
        fontFamilyPrimary,
      },
      h6: {
        fontFamilyPrimary,
      },
    },
  });
};

const STORAGE_LIMIT_MB = 50;

export default function KnowledgeManagement() {
  const [theme, setTheme] = useState(createCustomTheme());
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    fetchUserData();
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchFiles = async (userId) => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/files`, {
        params: { userId },
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
        }
      });
      const filesData = JSON.parse(response.data.computation_data.body).fileComputation;
      setFiles(filesData.map(file => ({
        id: file.fileId,
        uploadDate: new Date(file.timestamp).toLocaleString(),
        name: file.originalFileName,
        size: file.Size.toFixed(2),
        synchronized: file.isSync ? 'Sim' : 'Não',
        isDeleted: file.isDeleted,
        chunks: file.chunks  // Add chunks to file data
      })));
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/users?userId=${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });
        const user = response.data;
        setUserName(user.nome);
        setUserEmail(user.email);
        fetchFiles(userId);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUploadComplete = (status) => {
    setOpenDrawer(false);
    if (status === 'success') {
      setSnackMessage('Envio com sucesso!');
      setSnackSeverity('success');
      fetchUserData();
    } else {
      setSnackMessage('Não foi possível o envio do arquivo');
      setSnackSeverity('error');
    }
  };

  const handleMenuOpen = (file) => {
    setSelectedFile(file);
    setMenuDrawerOpen(true);
  };

  const handleMenuClose = () => {
    setSelectedFile(null);
    setMenuDrawerOpen(false);
  };

  const handleSync = async () => {
    if (selectedFile && userEmail) {
      setSyncing(true);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/reader`, {
          folder: userEmail,
          fileId: selectedFile.id,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });
        
        const responseBody = response.data.response ? JSON.parse(response.data.response.body) : null;
        if (response.data.response.statusCode === 200) {
          setSnackMessage(responseBody?.message || 'Arquivo sincronizado com sucesso!');
          setSnackSeverity('success');
          setFiles(files.map(file => file.id === selectedFile.id ? { ...file, synchronized: 'Sim' } : file));
        } else {
          throw new Error('Erro ao sincronizar arquivo');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao sincronizar arquivo';
        setSnackMessage(errorMessage);
        setSnackSeverity('error');
        console.error('Erro ao sincronizar arquivo:', error);
      } finally {
        setSyncing(false);
        handleMenuClose();
      }
    }
  };

  const handleUnsync = async () => {
    if (selectedFile && userEmail) {
      setSyncing(true);
      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/reader`, {
          fileId: selectedFile.id,
          namespace: userEmail,
          chunks: selectedFile.chunks,  // Use dynamic chunks value
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });

        if (response.data.statusCode === 200) {
          setSnackMessage('Arquivo dessincronizado com sucesso!');
          setSnackSeverity('success');
          setFiles(files.map(file => file.id === selectedFile.id ? { ...file, synchronized: 'Não' } : file));
        } else {
          throw new Error('Erro ao dessincronizar arquivo');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao dessincronizar arquivo';
        setSnackMessage(errorMessage);
        setSnackSeverity('error');
        console.error('Erro ao dessincronizar arquivo:', error);
      } finally {
        setSyncing(false);
        handleMenuClose();
      }
    }
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem('user_id');
    if (selectedFile && userId) {
      try {
        if (selectedFile.synchronized === 'Sim') {
          // Dessincronizar primeiro
          await handleUnsync();
        }
  
        // Deletar o arquivo
        await axios.delete(`${process.env.NEXT_PUBLIC_APIURL}/files`, {
          params: { fileId: selectedFile.id, userId },
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });
  
        setSnackMessage('Arquivo excluído com sucesso!');
        setSnackSeverity('success');
        fetchFiles(userId);
        setTabIndex(1);
      } catch (error) {
        console.error('Erro ao excluir arquivo:', error);
        setSnackMessage('Erro ao excluir arquivo');
        setSnackSeverity('error');
      } finally {
        handleMenuClose();
      }
    }
  };
  

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const filteredFiles = files.filter(file => {
    return tabIndex === 0 ? !file.isDeleted : file.isDeleted;
  });

  // Calculate total storage used excluding deleted files
  const totalStorageUsedKB = files.reduce((total, file) => file.isDeleted ? total : total + parseFloat(file.size), 0).toFixed(2);
  const totalStorageUsedMB =  (totalStorageUsedKB / 1024).toFixed(2);
  const availableStorageMB = (STORAGE_LIMIT_MB - totalStorageUsedMB).toFixed(2);
  const storageUsedPercentage = ((totalStorageUsedMB / STORAGE_LIMIT_MB) * 100).toFixed(2);

  return (
    <TokenVerification>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {!isMobile && <Navbar />}
            <Box
              component="main"
              sx={{
                backgroundColor: '#FFFFFF',
                flexGrow: 1,
                overflow: 'auto',
                mt: { xs: '0px', sm: '0px' }
              }}
            >
              <Header userName={userName} />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {loading ? (
                      <>
                        <Skeleton variant="text" width={200} height={50} />
                        <Skeleton variant="text" width={300} height={30} />
                      </>
                    ) : (
                      <Box>
                        <Box sx={{ display: 'block', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: '700' }} gutterBottom>
                            Conhecimento
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                              {`${totalStorageUsedMB} MB / ${STORAGE_LIMIT_MB} MB`}
                            </Typography>
                            <LinearProgress variant="determinate" value={storageUsedPercentage} sx={{ width: '100px', height: '10px', borderRadius: '5px' }} />
                          </Box>
                        </Box>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs">
                          <Tab label="PRINCIPAL" icon={<FolderIcon />} iconPosition="start" />
                          <Tab label="EXCLUÍDOS" icon={<DeleteIcon />} iconPosition="start" />
                        </Tabs>
                        <List>
                          {filteredFiles.map((file) => (
                            <ListItem key={file.id} disableGutters>
                              <ListItemAvatar>
                                <Avatar>
                                  <FolderIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={file.name}
                                secondary={
                                  <Box>
                                    <Typography variant="body2">{`Tamanho: ${(file.size/1024).toFixed(2)} MB | Data de Envio: ${file.uploadDate}`}</Typography>
                                    {file.synchronized === 'Sim' && (
                                      <Chip
                                        icon={<SyncIcon />}
                                        label="Sincronizado"
                                        sx={{
                                          mt: 1,
                                          backgroundColor: '#e0ffe0',
                                          color: '#388e3c',
                                        }}
                                      />
                                    )}
                                  </Box>
                                }
                              />
                              {tabIndex === 0 && (
                                <IconButton aria-label="menu" onClick={() => handleMenuOpen(file)}>
                                  <MoreVertIcon />
                                </IconButton>
                              )}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Container>
              {isMobile && <MenuMobile theme={theme} />}
            </Box>
          </Box>
          <SwipeableDrawer
            anchor="bottom"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                height: '50%',
                overflow: 'visible',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor: theme.palette.background.default,
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
                backgroundColor: theme.palette.background.default,
                p: 2,
                textAlign: 'center'
              }}
            >
              <Typography sx={{ color: 'text.secondary' }}>Upload de Arquivos</Typography>
            </Box>
            <Box sx={{
              pt: 8,
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
              backgroundColor: theme.palette.background.default
            }}>
              <DropzoneDocs
                fileType="pdf"
                setUploadedFiles={(files) => console.log(files)}
                onUploadComplete={handleUploadComplete}
              />
            </Box>
          </SwipeableDrawer>
          <SwipeableDrawer
            anchor="bottom"
            open={menuDrawerOpen}
            onClose={handleMenuClose}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                height: '30%',
                overflow: 'visible',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor: theme.palette.background.default,
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
                backgroundColor: theme.palette.background.default,
                p: 2,
                textAlign: 'center'
              }}
            >
              <Typography sx={{ color: 'text.secondary' }}>Ações do Arquivo</Typography>
            </Box>
            <Box sx={{
              pt: 8,
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
              backgroundColor: theme.palette.background.default
            }}>
              {syncing ? (
                <CircularProgress />
              ) : (
                <>
                  {selectedFile?.synchronized === 'Sim' ? (
                    <MenuItem onClick={handleUnsync}>Dessincronizar</MenuItem>
                  ) : (
                    <MenuItem onClick={handleSync}>Sincronizar</MenuItem>
                  )}
                  <MenuItem onClick={handleDelete}>Excluir</MenuItem>
                </>
              )}
            </Box>
          </SwipeableDrawer>
          <Snackbar open={snackMessage !== ''} autoHideDuration={6000} onClose={() => setSnackMessage('')}>
            <Alert onClose={() => setSnackMessage('')} severity={snackSeverity}>
              {snackMessage}
            </Alert>
          </Snackbar>
          <Fab
            className="button-primary"
            variant={scrollY === 0 ? 'extended' : 'circular'}
            aria-label="upload"
            onClick={() => setOpenDrawer(true)}
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              zIndex: 1,
              backgroundColor: totalStorageUsedMB >= STORAGE_LIMIT_MB ? 'gray' : 'black', // Change color if disabled
              color: 'white',
              pointerEvents: totalStorageUsedMB >= STORAGE_LIMIT_MB ? 'none' : 'auto' // Disable interaction if storage is full
            }}
          >
            <UploadIcon sx={{ color: 'white' }} />
            {scrollY === 0 && <Box component="span" sx={{ ml: 1 }}>Upload</Box>}
          </Fab>
        </Box>
      </ThemeProvider>
    </TokenVerification>
  );
}
