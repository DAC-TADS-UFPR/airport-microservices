import express from 'express';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVICE_CONFIG } from '../config/services';

const router = express.Router();

router.get('/', createProxyMiddleware({
  target: SERVICE_CONFIG.AUTH.url,
  pathRewrite: { '^/auth': '/auth' },
  changeOrigin: true
}));

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_CONFIG.AUTH.url}/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (e:any) {
    console.error('Error during login:', e.response?.data || e.message);
    res.status(e.response?.status).json(e.response?.data);
  }
});

export default router;