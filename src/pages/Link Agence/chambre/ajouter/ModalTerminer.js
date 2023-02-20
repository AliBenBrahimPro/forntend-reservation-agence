import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function ModalTerminer() {
 const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return (
      <>
          <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="button" color="secondary" variant="contained" onClick={handleOpen}>
                    Terminer
              </Button>
              </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            Terminé avec success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
                display="grid"
                gap="10px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            >
                  <Button type="button" color="secondary" variant="contained" onClick={handleOpen}>
                    Ajouter autre chambre
              </Button>
                      <span></span>
                  <Button type="button" color="secondary" variant="contained" onClick={handleOpen}>
                    reservation transport
              </Button>
              </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
