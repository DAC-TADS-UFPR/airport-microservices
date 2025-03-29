import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { SERVICE_CONFIG } from '../config/services';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const response = await axios.post(`${SERVICE_CONFIG.AUTH.url}/validate`, { token });
    
    if (response.data.valid) {
      const decoded = jwt.decode(token) as { userId: string, userType: 'CLIENTE' | 'FUNCIONARIO' };
      next();
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error('Erro na validação do token:', error);
    return res.sendStatus(500);
  }
}

export function authorize(...allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.sendStatus(401);
    if (allowedTypes.includes(req.user.type)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}