import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import { SERVICE_CONFIG } from '../config/services';
import axios from 'axios';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.post(`${SERVICE_CONFIG.RESERVATION.url}`, req.body);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error creating reservation:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Erro ao criar reserva' });
    }
  }
);

router.get(
  '/:id',
  authenticateToken,
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.RESERVATION.url}/${req.params.id}`, req.body);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching reservation:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao buscar reserva' });
    }
  }
);


router.patch(
  '/:id/estado',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.patch(`${SERVICE_CONFIG.FLIGHTS.url}/${req.params.id}/estado`, req.body);      
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error updating reservation state:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao atualizar estado da reserva' });
    }
  }
);

export default router;
