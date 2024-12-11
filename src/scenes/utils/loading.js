import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Swal from 'sweetalert2';

const Loading = ({ isSuccess }) => {
    useEffect(() => {
        if (isSuccess !== null) {
            Swal.fire({
                icon: isSuccess ? 'success' : 'error',
                title: isSuccess ? 'Opération réussie!' : 'Échec de l\'opération.',
                text: isSuccess ? 'Vos informations ont été envoyées avec succès.' : 'Une erreur s\'est produite lors de l\'envoi des informations.',
                confirmButtonText: 'OK'
            });
        }
    }, [isSuccess]);

    return (
        // <Box
        //   display="flex"
        //   flexDirection="column"
        //   alignItems="center"
        //   justifyContent="center"
        //   height="100vh"
        //   bgcolor="#f0f2f5"
        // >
        //   {isSuccess === null ? (
        //     <Box display="flex" flexDirection="column" alignItems="center">
        //       <CircularProgress size={60} />
        //       <Typography variant="h6" marginTop={2}>
        //         Chargement en cours...
        //       </Typography>
        //     </Box>
        //   ) : isSuccess ? (
        //     <Box display="flex" alignItems="center" color="green">
        //       <CheckCircleOutlineIcon sx={{ fontSize: 60 }} />
        //       <Typography variant="h6" marginLeft={1}>
        //         Opération réussie !
        //       </Typography>
        //     </Box>
        //   ) : (
        //     <Box display="flex" alignItems="center" color="red">
        //       <ErrorOutlineIcon sx={{ fontSize: 60 }} />
        //       <Typography variant="h6" marginLeft={1}>
        //         Échec de l'opération.
        //       </Typography>
        //     </Box>
        //   )}         
        // </Box>
        <>
        </>
    );
};

export default Loading;