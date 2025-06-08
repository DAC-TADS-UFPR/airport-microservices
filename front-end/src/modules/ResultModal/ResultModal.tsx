import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonDefault from '@/components/Buttons/ButtonDefault/ButtonDefault';
import './ResultModal.scss';

interface ResultModalProps {
  open: boolean;
  isSuccess: boolean;
  isPending: boolean;
  message: string;
  onClose: () => void;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ResultModal: FC<ResultModalProps> = ({
  open,
  isSuccess,
  isPending,
  message,
  onClose
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="reservation-result-modal"
    >
      <Box sx={modalStyle} className={`resultModal ${isSuccess ? 'success' : 'error'}`}>
        {isPending ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Processando...
          </Typography>
        ) : (
          <div className="resultModal__content">
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 2,
                color: isSuccess ? 'success.main' : 'error.main',
                textAlign: 'center'
              }}
            >
              {message}
            </Typography>
            
            <div className="resultModal__button">
                <ButtonDefault onClick={onClose}>
                    Fechar
                </ButtonDefault>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ResultModal;