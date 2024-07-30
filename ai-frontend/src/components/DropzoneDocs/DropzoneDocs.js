import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, CircularProgress, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { v4 as uuidv4 } from 'uuid';

const DropzoneDocs = ({ fileType, setUploadedFiles, onUploadComplete, fetchFiles }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    setErrorMessage(null);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    acceptedFiles.forEach(async (file) => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          setErrorMessage("ID do usuário não está disponível.");
          setLoading(false);
          return;
        }

        const fileName = file.name;
        const apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/files?userId=${userId}&originalFileName=${encodeURIComponent(fileName)}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
            'Content-Type': file.type,
          },
          body: file,
        });

        let data;
        try {
          data = await response.json();
        } catch (e) {
          throw new Error('A resposta do servidor não é um JSON válido.');
        }

        if (response.ok) {
          setUploadedFiles((prev) => ({
            ...prev,
            [fileType]: { file, fileName: file.name },
          }));
          if (fetchFiles) fetchFiles(); // Atualiza a lista de arquivos
          onUploadComplete('success');
        } else {
          throw new Error(data.message || 'Erro ao enviar o arquivo');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setErrorMessage(error.message || 'Não foi possível o envio do arquivo');
        onUploadComplete('error');
      } finally {
        setLoading(false);
      }
    });
  }, [fileType, setUploadedFiles, onUploadComplete, fetchFiles]);

  const handleRemoveFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper
            {...getRootProps()}
            sx={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              color: 'text.secondary',
              border: '2px dashed #888888',
              boxShadow: 'none',
              backgroundColor: isDragActive ? '#fafafa' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 0,
            }}
          >
            <input {...getInputProps()} />
            <PictureAsPdfIcon sx={{ fontSize: 40 }} />
            <Typography>
              Clique ou arraste seu arquivo PDF até aqui.
            </Typography>
          </Paper>
          {files.length > 0 && (
            <Box sx={{ mt: 2, width: '100%' }}>
              <Typography variant="h6">Preview:</Typography>
              <List>
                {files.map((file) => (
                  <ListItem key={file.path}>
                    <ListItemText primary={file.path} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </>
      )}
      {errorMessage && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
          <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default DropzoneDocs;
