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

router.get(
  '/:id',
  authenticateToken,
  authorize('CLIENT'),
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.CLIENT.url}/${req.params.id}`, req.body);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching client:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao buscar cliente' });
    }
  }
);

export default router;