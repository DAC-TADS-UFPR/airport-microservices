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
      const response = await axios.post(`${SERVICE_CONFIG.FLIGHTS.url}/aeroportos`, req.body);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error creating airport:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Create airport failed' });
    }
  }
);


router.get(
  '/:id',
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const response = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/${id}`, {
        headers: {
          Authorization: req.headers.authorization || '',
        },
      });

      res.status(response.status).json(response.data);
    } catch (e: any) {
      console.error('Error fetching flight by ID:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Fetch flight by ID failed' });
    }
  }
);

router.get(
  '/',
  authenticateToken,
  async (req, res) => {
    try {
      const { dataInicial, dataFinal } = req.query;

      const params = new URLSearchParams();
      if (dataInicial) params.append('dataInicial', dataInicial as string);
      if (dataFinal) params.append('dataFinal', dataFinal as string);

      const url = `${SERVICE_CONFIG.FLIGHTS.url}?${params.toString()}`;
      
      const response = await axios.get(url, {
        headers: {
          Authorization: req.headers.authorization || '',
        },
      });

      res.status(response.status).json(response.data);

    } catch (e: any) {
      console.error('Error fetching flights:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Fetch flights failed' });
    }
  }
);

export default router;
