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
      const response = await axios.post(`${SERVICE_CONFIG.FLIGHTS.url}`, req.body);
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error creating flight:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Create flight failed' });
    }
  }
);

router.get(
  '/',
  authenticateToken,
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}`, req.body);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching flights:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Fetch flights failed' });
    }
  }
);


router.patch(
  '/:id/state',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.patch(`${SERVICE_CONFIG.FLIGHTS.url}/${req.params.id}/estado`, req.body);      
      res.status(response.status).json(response.data);
    } catch (e:any) {
      console.error('Error updating flight state:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Update state failed' });
    }
  }
);

export default router;
