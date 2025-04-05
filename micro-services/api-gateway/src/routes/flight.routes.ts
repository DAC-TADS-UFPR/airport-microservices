import express from 'express';
import axios from 'axios';
import { authenticateToken, authorize } from '../middleware/auth';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVICE_CONFIG } from '../config/services';

const router = express.Router();

router.get('/', authenticateToken, authorize('EMPLOYEE'), async (req, res) => {
  try {
    console.log('url request:', `${SERVICE_CONFIG.FLIGHTS.url}`);

    const response = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}`);
    res.status(response.status).json(response.data);
  } catch (e:any) {
    console.error('Erro durante a requesição:', e.response?.data || e.message);
    res.status(e.response.status).json(e.response.data);
  }
});
export default router;