import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import { SERVICE_CONFIG } from '../config/services';
import axios from 'axios';
import { ReservationFullResponse } from '../models/reservation/ReservationFull';
import { ReservationSagaOrchestatorator } from '../orchestrators/reservation.saga.ocherstrator';

const router = express.Router();
const reservationSagaOrchestatorator = new ReservationSagaOrchestatorator();
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
        .json({ message: e.response?.data || 'Erro ao criar reserva' });
    }
  }
);

router.get(
  '/:id',
  authenticateToken,
  async (req, res) => {
    try {
      const result = await reservationSagaOrchestatorator.findReservation(req.params.id);
      const data: ReservationFullResponse = result.data;      
      res.status(result.status).json(data);

    } catch (e:any) {
      console.error('Error fetching reservation:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao buscar reserva' });
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
        .json({ message: e.response?.data || 'Falha ao atualizar estado da reserva' });
    }
  }
);

router.delete(
  '/:id',
  authenticateToken,
  authorize('CLIENT'),
  async (req, res) => {
    try {
      const response = await axios.delete(`${SERVICE_CONFIG.FLIGHTS.url}/${req.params.id}`);      
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error updating reservation state:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao atualizar estado da reserva' });
    }
  }
);

export default router;
