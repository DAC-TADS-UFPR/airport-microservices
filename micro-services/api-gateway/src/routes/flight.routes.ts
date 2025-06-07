import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import { SERVICE_CONFIG } from '../config/services';
import axios from 'axios';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorize('FUNCIONARIO'),
  async (req, res) => {
    try {
      console.log('url', `${SERVICE_CONFIG.FLIGHTS.url}/voos`);
      const response = await axios.post(`${SERVICE_CONFIG.FLIGHTS.url}/voos`, req.body);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error creating flight:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Create flight failed' });
    }
  }
);



router.patch(
  '/:id/estado',
  authenticateToken,
  async (req, res) => {
    try {
      const response = await axios.patch(`${SERVICE_CONFIG.FLIGHTS.url}/voos/${req.params.id}/estado`, req.body);      
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error updating flight state:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Update state failed' });
    }
  }
);

router.get(
  '/:id',
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const response = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/voo/${id}`);

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
      const {
        inicio,
        fim,
        data,
        destino,
        origem
      } = req.query;

      const params = new URLSearchParams();

      if (inicio) params.append('dataInicial', inicio as string);
      if (fim) params.append('dataFinal', fim as string);
      if (data) params.append('data', data as string);
      if (origem) params.append('codigoAeroportoOrigem', origem as string);
      if (destino) params.append('codigoAeroportoDestino', destino as string);
      console.log('params', params.toString());
      const url = `${SERVICE_CONFIG.FLIGHTS.url}/voos?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: req.headers.authorization || '',
        },
      });

      res.status(response.status).json(
        {
          voos: response.data,
          data:data,
          origem: origem,
          destino: destino,
          inicio: inicio,
          fim: fim
        }
      );

    } catch (e: any) {
      console.error('Error fetching flights:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Fetch flights failed' });
    }
  }
);

export default router;
