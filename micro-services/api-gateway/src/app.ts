import express from 'express';
import authRoutes from './routes/auth.routes';
import flightRoutes from './routes/flight.routes';
import clientRoutes from './routes/client.routes';
import employeeRoutes from './routes/employee.routes';
import airportRoutes from './routes/airport.routes';
import reservationRoutes from './routes/reservation.routes';
import { logApiRequest, logApiResponse } from './config/logger';
import cors from 'cors';
import { setupAxiosInterceptors } from './config/axios.config';

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  
  app.use(cors(corsOptions)); 

app.use(express.json());

app.use((req, res, next) => {
    logApiRequest(req);
    next();
});
  
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
      logApiResponse(res, body);
      return originalSend.call(this, body);
    };
    next();
});

app.use((req, res, next) => {
  setupAxiosInterceptors(req);
  next();
});
  
app.use(authRoutes);
app.use('/clientes', clientRoutes);
app.use('/voos', flightRoutes);
app.use('/funcionarios', employeeRoutes);
app.use('/aeroportos', airportRoutes);
app.use('/reservas', reservationRoutes);

app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});

export default app;