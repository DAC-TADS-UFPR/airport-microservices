import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVICE_CONFIG } from '../config/services';

const router = express.Router();

router.get('/', createProxyMiddleware({
  target: SERVICE_CONFIG.AUTH.url,
  pathRewrite: { '^/auth': '/auth' },
  changeOrigin: true
}));

router.post('/', authenticateToken, authorize('FUNCIONARIO'), 
  createProxyMiddleware({
    target: SERVICE_CONFIG.AUTH.url,
    pathRewrite: { '^/auth': '/auth' },
    changeOrigin: true
  })
);

export default router;