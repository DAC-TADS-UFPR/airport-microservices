import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import { SERVICE_CONFIG } from '../config/services';
import axios from 'axios';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.post(`${SERVICE_CONFIG.FLIGHTS.url}/aeroportos`, req.body);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error creating airport:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Create airport failed' });
    }
  }
);


router.get(
  '/',
  authenticateToken,
  async (req, res) => {
    try {

      const url = `${SERVICE_CONFIG.FLIGHTS.url}/aeroportos`;
      
      const response = await axios.get(url, {
        headers: {
          Authorization: req.headers.authorization || '',
        },
      });

      res.status(response.status).json(response.data);

    } catch (e: any) {
      console.error('Error fetching airports:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data || 'Fetch airports failed' });
    }
  }
);

export default router;
