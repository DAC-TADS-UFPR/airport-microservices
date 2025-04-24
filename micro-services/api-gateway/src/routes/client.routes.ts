import express from 'express';
import axios from 'axios';
import { ClientSagaOrchestatorator } from '../orchestrators/clientSaga.orchestrator';

const router = express.Router();
const clientSagaOrchestrator = new ClientSagaOrchestatorator();
router.post('/create', async (req, res) => {
    try {
      const response  =  await clientSagaOrchestrator.createClient(req.body);
      return res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error durante ao criar o cliente:', e.response?.data || e.message);
      res.status(e.response?.status).json(e.response?.data);
    }
});

export default router;