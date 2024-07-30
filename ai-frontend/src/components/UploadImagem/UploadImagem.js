import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DropzoneArea from '../DropzoneArea/DropzoneArea';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function UploadImagem(props) {
  const { window, open, toggleDrawer, updateProfilePicture } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleUploadComplete = (newUrl) => {
    updateProfilePicture(newUrl);
    toggleDrawer(false)();
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ m: 2, p: 2, color: 'text.secondary', textAlign: 'center' }}>Foto de Perfil</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            p: 2,
            m: 2,
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropzoneArea onUploadComplete={handleUploadComplete} />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

UploadImagem.propTypes = {
  window: PropTypes.func,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  updateProfilePicture: PropTypes.func.isRequired,
};

export default UploadImagem;
