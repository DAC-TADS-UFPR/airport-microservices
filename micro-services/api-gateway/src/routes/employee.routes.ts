import express from 'express';
import axios from 'axios';
import { authenticateToken, authorize } from '../middleware/auth';
import { SERVICE_CONFIG } from '../config/services';

const router = express.Router();

router.post('/', authenticateToken, authorize('EMPLOYEE'), async (req, res) => {
    try {
      console.log('url request:', `${SERVICE_CONFIG.EMPLOYEE.url}`);
  
      const response = await axios.get(`${SERVICE_CONFIG.EMPLOYEE.url}`);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Erro durante a requesição:', e.response?.data || e.message);
      res.status(e.response?.status || 500).json({
        message: e.response?.data?.message || 'Authentication failed'
      });
    }
});

export default router;