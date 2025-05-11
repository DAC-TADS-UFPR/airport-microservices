import express from 'express';
import { authenticateToken, authorize , extractToken } from '../middleware/auth';
import { EmployeeSagaOrchestatorator } from '../orchestrators/employee.saga.orchestrator';
import { SERVICE_CONFIG } from '../config/services';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
const employeeSagaOrchestrator = new EmployeeSagaOrchestatorator();


router.post('/' , authenticateToken, async (req : Request, res :Response) => {
  try {
    const token = extractToken(req);
    console.log('token', token);
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const response = await employeeSagaOrchestrator.createEmployee(req.body , token)
    res.status(response.status).json(response.data);
  } catch (e:any) {
    console.error('Error during employee creation:', e.response?.data || e.message);
    res.status(e.response?.status || 500).json({
      message: e.response?.data?.message || 'Erro ao criar funcionario',
    });
  }
});

router.get(
  '/',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.EMPLOYEE.url}`);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching reservation:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao buscar funcionario' });
    }
  }
);

router.get(
  '/:id',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.get(`${SERVICE_CONFIG.EMPLOYEE.url}/${req.params.id}`);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching employee:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao buscar funcionario' });
    }
  }
);

router.put(
  '/:id',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await employeeSagaOrchestrator.updateEmployee(req.body)
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error fetching employee:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao alterar funcionario' });
    }
  }
);

router.delete(
  '/:id',
  authenticateToken,
  authorize('EMPLOYEE'),
  async (req, res) => {
    try {
      const response = await axios.delete(`${SERVICE_CONFIG.RESERVATION.url}/${req.params.id}`);      
      res.status(response.status).json(response.data);

    } catch (e:any) {
      console.error('Error deleting employee:', e.response?.data || e.message);
      res
        .status(e.response?.status || 500)
        .json({ message: e.response?.data?.message || 'Falha ao deletar funcionario' });
    }
  }
);


export default router;