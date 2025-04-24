import express from 'express';
import { authenticateToken, authorize } from '../middleware/auth';
import { EmployeeSagaOrchestatorator } from '../orchestrators/employeeSagaOrchestrator';
const router = express.Router();
const employeeSagaOrchestrator = new EmployeeSagaOrchestatorator();
router.post('/', authenticateToken, authorize('EMPLOYEE'), async (req, res) => {
    try {
        const response = await employeeSagaOrchestrator.createEmployee(req.body);
        res.status(response.status).json(response.data);
    }
    catch (e) {
        console.error('Error during employee creation:', e.response?.data || e.message);
        res.status(e.response?.status || 500).json({
            message: e.response?.data?.message || 'Authentication failed'
        });
    }
});
export default router;
