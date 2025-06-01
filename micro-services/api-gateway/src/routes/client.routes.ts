import express from 'express';
import { ClientSagaOrchestatorator } from '../orchestrators/client.saga.orchestrator';
import { authenticateToken, authorize } from '../middleware/auth';
import { SERVICE_CONFIG } from '../config/services';
import axios from 'axios';

const router = express.Router();
const clientSagaOrchestrator = new ClientSagaOrchestatorator();
router.post('/', async (req, res) => {
    try {
      const response  =  await clientSagaOrchestrator.createClient(req.body);
      return res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error durante ao criar o cliente:', e.response?.data || e.message);
      res.status(e.response?.status).json(e.response?.data);
    }
});

router.put('/:id/milhas', async (req, res) => {
    try {
      const response = await axios.post(`${SERVICE_CONFIG.CLIENT.url}/${req.params.id}/milhas`, req.body);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching client:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao buscar cliente' });
    }
});

router.get(
  '/:id',
  authenticateToken,
  authorize('CLIENTE'),
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.CLIENT.url}/${req.params.id}`, req.body);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching client:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao buscar cliente' });
    }
  }
);

router.get(
  '/',
  authenticateToken,
  authorize('CLIENTE'),
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.CLIENT.url}`);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching clients:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao buscar clientes' });
    }
  }
);

router.get(
  '/:id/milhas',
  authenticateToken,
  authorize('CLIENTE'),
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.CLIENT.url}/${req.params.id}/milhas`);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching client miles:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao buscar milhas do cliente' });
    }
  }
);

router.get(
  '/:id/reservas',
  authenticateToken,
  authorize('CLIENTE'),
  async (req, res) => {
    try {
      const result = await clientSagaOrchestrator.findReservationsByClient(req.params.id);
      const data = result.data;      
      res.status(result.status).json(data);
    } catch (e:any) {
      console.error('Error fetching reservations:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Falha ao buscar reservas do cliente' });
    }
  }
);

export default router;