import express from 'express';
import axios from 'axios';
import { authenticateToken, authorize } from '../middleware/auth';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVICE_CONFIG } from '../config/services';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
      console.log('Client create request:', req.body);
      console.log('url request:', `${SERVICE_CONFIG.AUTH.url}/create`);
  
      const response = await axios.post(`${SERVICE_CONFIG.AUTH.url}/create`, req.body);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error durante ao criar o cliente:', e.response?.data || e.message);
      res.status(e.response.status).json(e.response.data);
    }
});

export default router;