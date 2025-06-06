import jwt from 'jsonwebtoken';
import axios from 'axios';
import { SERVICE_CONFIG } from '../config/services';
//TODO: criar reponseError.ts para padronizar as respostas de erro
export async function authenticateToken(req, res, next) {
    const token = extractToken(req);
    if (!token)
        return res.status(401).json({ error: 'Token não fornecido' });
    try {
        const response = await axios.post(`${SERVICE_CONFIG.AUTH.url}/validate`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.authenticated) {
            const decoded = jwt.decode(token);
            response.data.user = decoded;
            return next();
        }
        else {
            return res.status(403).json({ error: 'Token inválido' });
        }
    }
    catch (error) {
        console.error('Erro ao validar token:', error);
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            return res.status(403).json({ error: 'Token rejeitado pelo serviço de autenticação' });
        }
        return res.status(500).json({ error: 'Erro interno na autenticação' });
    }
}
//TODO: adicionar user.ts  na decodificação do token 
//TODO: criar reponseError.ts para padronizar as respostas de erro
export function authorize(...allowedTypes) {
    return (req, res, next) => {
        const token = extractToken(req);
        if (!token)
            return res.status(401).json({ error: 'Token não fornecido' });
        const decoded = jwt.decode(token);
        if (!decoded)
            return res.sendStatus(401);
        if (allowedTypes.includes(decoded.userType)) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
}
function extractToken(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return null;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer')
        return null;
    return parts[1];
}
