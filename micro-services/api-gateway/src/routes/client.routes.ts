import express from 'express';
import axios from 'axios';
import { SERVICE_CONFIG } from '../config/services';
import { ClientSagaOrchestatorator } from '../orchestrators/clientSagaOrchestrator';

const router = express.Router();
const clientSagaOrchestrator = ClientSagaOrchestatorator.getInstance();

router.post('/create', async (req, res) => {
    try {
      return await clientSagaOrchestrator.createClient(req.body);
    } catch (e:any) {
      console.error('Error durante ao criar o cliente:', e.response?.data || e.message);
      res.status(e.response.status).json(e.response.data);
    }
});

export default router;