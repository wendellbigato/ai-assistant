import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const DropzoneArea = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    acceptedFiles.forEach(file => {
      const fileName = `${uuidv4()}-${file.name}`;
      const apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/upload?file_name=${fileName}`;

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI,
          'Content-Type': file.type // Ensure the Content-Type is set correctly
        },
        body: file
      })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
        const fileUrl = data.file_url;
        
        const userId = localStorage.getItem('user_id');
        return axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/users?id=${userId}`, { profile_picture: fileUrl }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHAVEAPI
          }
        });
      })
      .then(response => {
        console.log('Profile picture URL updated successfully:', response.data);
        setLoading(false);
        onUploadComplete(); // Chama a função para fechar o componente
      })
      .catch(error => {
        console.error('Error uploading file or updating profile picture URL:', error);
        setLoading(false);
      });
    });
  }, [onUploadComplete]);

  const handleRemoveFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Limitar para arquivos de imagem
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
              margin: 0, // Garantir que não haja margem
            }}
          >
            <input {...getInputProps()} />
            <ImageIcon sx={{ fontSize: 40 }} /> {/* Ícone de imagem */}
            <Typography>
              Clique ou arraste seu arquivo até aqui.
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
    </Box>
  );
};

export default DropzoneArea;
